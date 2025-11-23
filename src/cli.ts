#!/usr/bin/env node

import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { program } from 'commander';
import { scaffoldTemplate, displaySetupInstructions, DependencyManager } from './index.js';
import { availableTemplates } from './templates.js';
import type { Template } from './templates.js';

program
  .name('stack-end')
  .description('CLI tool for scaffolding backend templates')
  .version('1.0.0');

program
  .argument('<template>', 'Template name to scaffold')
  .argument('[destination]', 'Destination directory (optional)', '.')
  .action(async (templateName: string, destination: string) => {
    let cloneSpinner: Ora | undefined;
    let envSpinner: Ora | undefined;
    let depsSpinner: Ora | undefined;

    try {
      const result = await scaffoldTemplate(templateName, destination, {
        onCloneStart(template: Template, targetDir: string) {
          cloneSpinner = ora(`Cloning ${chalk.cyan(template.name)} template...`).start();
        },
        onCloneSuccess(template: Template, targetDir: string) {
          cloneSpinner?.succeed(chalk.green(`Repository cloned successfully`));
        },
        onEnvironmentStart(targetDir: string) {
          envSpinner = ora('Setting up environment file...').start();
        },
        onEnvironmentSuccess(targetDir: string, created: boolean) {
          if (created) {
            envSpinner?.succeed(chalk.green('.env file created from .env.example'));
          } else {
            envSpinner?.info(chalk.blue('No .env.example found or .env already exists'));
          }
        },
        onDependenciesStart(targetDir: string) {
          depsSpinner = ora('Installing dependencies...').start();
        },
        onDependenciesSuccess(targetDir: string, managers: DependencyManager[]) {
          if (managers.length > 0) {
            const managersList = managers.map((m) => m.toUpperCase()).join(' and ');
            depsSpinner?.succeed(chalk.green(`Dependencies installed (${managersList})`));
          } else {
            depsSpinner?.info(chalk.blue('No dependency files found'));
          }
        }
      });

      console.log();
      console.log(chalk.green.bold('✓ Project ready!'));
      console.log();
      const instructions = displaySetupInstructions(result.template.name, result.targetDirectory);
      instructions.forEach((line, index) => {
        if (index === 0) {
          console.log(chalk.green(line));
        } else if (line.startsWith('  ')) {
          if (line.includes('cd ')) {
            console.log(chalk.cyan(line));
          } else {
            console.log(chalk.white(line));
          }
        } else {
          console.log(chalk.blue(line));
        }
      });
      console.log();
      console.log(chalk.gray('For more information, check the README.md file in your project directory.'));
      console.log();
    } catch (error) {
      cloneSpinner?.fail();
      envSpinner?.fail();
      depsSpinner?.fail();

      console.log();
      console.error(chalk.red('✖ Error:'), error instanceof Error ? error.message : String(error));
      console.log();

      if (error instanceof Error && error.message.includes('not available')) {
        console.log(chalk.yellow('Available templates:'));
        availableTemplates.forEach((t) => {
          console.log(`  ${chalk.cyan(t.name)} - ${t.description}`);
        });
        console.log();
      }

      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available templates')
  .action(() => {
    console.log();
    console.log(chalk.blue.bold('Available templates:'));
    console.log();
    availableTemplates.forEach((template) => {
      console.log(`  ${chalk.cyan.bold(template.name)}`);
      console.log(`    ${chalk.white(template.description)}`);
      console.log(`    ${chalk.gray('Version:')} ${template.version}`);
      console.log(`    ${chalk.gray('Repository:')} ${template.url}`);
      console.log();
    });
  });

if (process.argv.length < 3) {
  program.help();
}

program.parse();
