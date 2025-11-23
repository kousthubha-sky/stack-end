#!/usr/bin/env node

import chalk from 'chalk';
import ora from 'ora';
import { program } from 'commander';
import { scaffoldTemplate } from './index.js';
import { availableTemplates } from './templates.js';

program
  .name('stack-end')
  .description('CLI tool for scaffolding backend templates')
  .version('0.0.1');

program
  .argument('<template>', 'Template name to scaffold')
  .argument('[destination]', 'Destination directory (optional)', '.')
  .option('-v, --verbose', 'Verbose output')
  .action(async (templateName: string, destination: string, options) => {
    const spinner = ora('Initializing...').start();
    
    try {
      if (options.verbose) {
        console.log(chalk.blue(`Looking for template: ${templateName}`));
      }

      const template = availableTemplates.find(t => t.name === templateName);
      
      if (!template) {
        spinner.fail();
        console.error(chalk.red(`Template "${templateName}" not found.`));
        console.log(chalk.yellow('Available templates:'));
        availableTemplates.forEach(t => {
          console.log(`  - ${chalk.green(t.name)}: ${t.description}`);
        });
        process.exit(1);
      }

      spinner.text = `Scaffolding ${templateName}...`;
      
      await scaffoldTemplate(template, destination, options.verbose);
      
      spinner.succeed(chalk.green(`Successfully scaffolded ${templateName}!`));
      
      if (options.verbose) {
        console.log(chalk.blue(`Template created in: ${destination}`));
      }
    } catch (error) {
      spinner.fail();
      console.error(chalk.red('Error scaffolding template:'), error);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available templates')
  .action(() => {
    console.log(chalk.blue('Available templates:'));
    availableTemplates.forEach(template => {
      console.log(`  ${chalk.green(template.name)} - ${template.description}`);
      console.log(`    Version: ${template.version}`);
      console.log(`    Repository: ${template.url}`);
      console.log();
    });
  });

if (process.argv.length < 3) {
  program.help();
}

program.parse();