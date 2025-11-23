import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { request as httpsRequest } from 'node:https';
import simpleGit from 'simple-git';
import { availableTemplates, Template } from './templates.js';

export type DependencyManager = 'npm' | 'pip';

export interface ScaffoldHooks {
  onCloneStart?(template: Template, targetDir: string): void;
  onCloneSuccess?(template: Template, targetDir: string): void;
  onEnvironmentStart?(targetDir: string): void;
  onEnvironmentSuccess?(targetDir: string, created: boolean): void;
  onDependenciesStart?(targetDir: string): void;
  onDependenciesSuccess?(targetDir: string, managers: DependencyManager[]): void;
}

export interface ScaffoldResult {
  template: Template;
  targetDirectory: string;
  dependencyManagers: DependencyManager[];
  envFileCreated: boolean;
}

class CommandExecutionError extends Error {
  constructor(
    message: string,
    public readonly command: string,
    public readonly exitCode?: number,
    public readonly originalError?: Error
  ) {
    super(message);
  }
}

export async function scaffoldTemplate(
  templateName: string,
  outputDir: string = '.',
  hooks?: ScaffoldHooks
): Promise<ScaffoldResult> {
  const template = validateTemplate(templateName);
  const targetDirectory = path.resolve(process.cwd(), outputDir || '.');

  await ensureDirectoryReady(targetDirectory);

  hooks?.onCloneStart?.(template, targetDirectory);
  await cloneRepository(template.url, template.version, targetDirectory);
  hooks?.onCloneSuccess?.(template, targetDirectory);

  hooks?.onEnvironmentStart?.(targetDirectory);
  const envFileCreated = await setupEnvironmentFile(targetDirectory);
  hooks?.onEnvironmentSuccess?.(targetDirectory, envFileCreated);

  hooks?.onDependenciesStart?.(targetDirectory);
  const dependencyManagers = await detectAndInstallDependencies(targetDirectory);
  hooks?.onDependenciesSuccess?.(targetDirectory, dependencyManagers);

  return {
    template,
    targetDirectory,
    dependencyManagers,
    envFileCreated
  };
}

export function validateTemplate(templateName: string): Template {
  const template = availableTemplates.find(({ name }) => name === templateName);

  if (!template) {
    throw new Error(`Template "${templateName}" is not available.`);
  }

  return template;
}

export async function cloneRepository(repoUrl: string, version: string, targetDir: string): Promise<void> {
  await assertNetworkConnectivity(repoUrl);

  const git = simpleGit();

  try {
    await git.clone(repoUrl, targetDir, ['--depth', '1', '--branch', version]);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to clone repository: ${message}`);
  }

  await fs.rm(path.join(targetDir, '.git'), { recursive: true, force: true });
}

export async function detectAndInstallDependencies(dir: string): Promise<DependencyManager[]> {
  const managers: DependencyManager[] = [];
  const packageJsonPath = path.join(dir, 'package.json');
  const requirementsPath = path.join(dir, 'requirements.txt');

  if (await fileExists(packageJsonPath)) {
    try {
      await runCommand('npm', ['install'], dir);
      managers.push('npm');
    } catch (error) {
      if (error instanceof CommandExecutionError && error.command === 'npm') {
        throw new Error(`Failed to install npm dependencies. Please run "npm install" manually in the project directory.`);
      }
      throw error;
    }
  }

  if (await fileExists(requirementsPath)) {
    try {
      await installPythonDependencies(dir);
      managers.push('pip');
    } catch (error) {
      if (error instanceof CommandExecutionError) {
        throw new Error(`Failed to install Python dependencies. Please run "pip install -r requirements.txt" manually in the project directory.`);
      }
      throw error;
    }
  }

  return managers;
}

export async function setupEnvironmentFile(dir: string): Promise<boolean> {
  const envExamplePath = path.join(dir, '.env.example');
  const envPath = path.join(dir, '.env');

  if (!(await fileExists(envExamplePath))) {
    return false;
  }

  if (await fileExists(envPath)) {
    return false;
  }

  await fs.copyFile(envExamplePath, envPath);
  return true;
}

export function displaySetupInstructions(templateName: string, outputDir: string): string[] {
  const relativePath = path.relative(process.cwd(), outputDir) || '.';

  return [
    `Project "${templateName}" is ready!`,
    'Next steps:',
    `  cd ${relativePath}`,
    '  npm run dev'
  ];
}

async function ensureDirectoryReady(targetDir: string): Promise<void> {
  try {
    const stats = await fs.stat(targetDir);

    if (!stats.isDirectory()) {
      throw new Error(`Path "${targetDir}" exists and is not a directory.`);
    }

    const contents = await fs.readdir(targetDir);

    if (contents.length === 0) {
      return;
    }

    const isCurrentDirectory = targetDir === process.cwd();

    if (isCurrentDirectory) {
      throw new Error('The current directory is not empty. Please choose a different destination.');
    }

    const confirmed = await promptForOverwrite(targetDir);

    if (!confirmed) {
      throw new Error('Directory already exists. Operation cancelled.');
    }

    await fs.rm(targetDir, { recursive: true, force: true });
    await fs.mkdir(targetDir, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await fs.mkdir(targetDir, { recursive: true });
      return;
    }

    throw error;
  }
}

async function promptForOverwrite(dir: string): Promise<boolean> {
  if (!input.isTTY || !output.isTTY) {
    return false;
  }

  const rl = createInterface({ input, output });
  const answer = (await rl.question(`Directory "${dir}" is not empty. Overwrite? (y/N): `)).trim().toLowerCase();
  rl.close();

  return answer === 'y' || answer === 'yes';
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function runCommand(command: string, args: string[], cwd: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    child.on('error', (error) => {
      reject(
        new CommandExecutionError(
          `Failed to start ${command}: ${error instanceof Error ? error.message : String(error)}`,
          command,
          undefined,
          error instanceof Error ? error : undefined
        )
      );
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new CommandExecutionError(`${command} exited with code ${code}`, command, code ?? undefined));
      }
    });
  });
}

async function installPythonDependencies(dir: string): Promise<void> {
  try {
    await runCommand('pip3', ['install', '-r', 'requirements.txt'], dir);
  } catch (error) {
    if (
      error instanceof CommandExecutionError &&
      error.command === 'pip3' &&
      typeof error.exitCode === 'undefined'
    ) {
      await runCommand('pip', ['install', '-r', 'requirements.txt'], dir);
      return;
    }

    throw error;
  }
}

async function assertNetworkConnectivity(repoUrl: string): Promise<void> {
  const { hostname } = new URL(repoUrl);

  await new Promise<void>((resolve, reject) => {
    const request = httpsRequest(
      { hostname, method: 'HEAD', timeout: 5000 },
      (response) => {
        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
          resolve();
        } else {
          reject(new Error(`Received status code ${response.statusCode} from ${hostname}`));
        }
        response.destroy();
      }
    );

    request.on('error', (error) => {
      reject(new Error(`Unable to reach ${hostname}: ${error instanceof Error ? error.message : String(error)}`));
    });

    request.on('timeout', () => {
      request.destroy();
      reject(new Error(`Network timeout while connecting to ${hostname}`));
    });

    request.end();
  });
}
