import chalk from 'chalk';
import ora from 'ora';
import simpleGit from 'simple-git';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Template } from './templates.js';

export async function scaffoldTemplate(template: Template, destination: string, verbose: boolean = false): Promise<void> {
  const targetPath = path.resolve(destination, template.name);
  
  if (verbose) {
    console.log(chalk.blue(`Target path: ${targetPath}`));
  }

  // Check if directory already exists
  try {
    await fs.access(targetPath);
    throw new Error(`Directory ${template.name} already exists in ${destination}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
    // Directory doesn't exist, which is what we want
  }

  const spinner = ora(`Cloning ${template.name} template...`).start();
  
  try {
    // Clone the repository
    const git = simpleGit();
    await git.clone(template.url, targetPath);
    
    spinner.succeed(chalk.green(`Template cloned successfully`));
    
    if (verbose) {
      console.log(chalk.blue(`Repository cloned from: ${template.url}`));
    }

    // Clean up git repository
    const cleanupSpinner = ora('Cleaning up...').start();
    const gitRepo = simpleGit(targetPath);
    await fs.rm(path.join(targetPath, '.git'), { recursive: true, force: true });
    cleanupSpinner.succeed(chalk.green('Cleanup completed'));

    // Update package.json if it exists
    const packageJsonPath = path.join(targetPath, 'package.json');
    try {
      await fs.access(packageJsonPath);
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      
      // Update name and version if needed
      if (!packageJson.name || packageJson.name === 'template-name') {
        packageJson.name = template.name;
      }
      
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
      
      if (verbose) {
        console.log(chalk.blue('Updated package.json'));
      }
    } catch (error) {
      if (verbose) {
        console.log(chalk.yellow('No package.json found or unable to update it'));
      }
    }

  } catch (error) {
    spinner.fail();
    throw new Error(`Failed to clone template: ${error}`);
  }
}

export function validateTemplate(template: Template): boolean {
  return !!(template.name && template.url && template.version);
}