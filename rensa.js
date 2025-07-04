#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import figlet from 'figlet';
import { createNewProject } from './commands/newProject.js';

console.log(chalk.hex('#FF7043')(figlet.textSync('Rensa', {horizontalLayout: 'fitted'})));

async function init () {
  console.log(chalk.hex("#FFFFFF")("\n✨ Welcome to Rensa! ✨\n\n"));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: chalk.hex('#11CFBC')("What's your project name?"),
      default: 'rensa-app',
    },
    {
      type: 'list',
      name: 'template',
      message: chalk.hex('#11CFBC')('Choose a template:'),
      choices: ['Compose', 'Manual'],
      default: 'Compose',
    }
  ]);

  console.log("\n");

  const spinner = ora({
    text: chalk.hex("#FF7043")("Revving up your project..."),
    spinner: 'dots'
  }).start();

  console.log("\n");

  try {
    createNewProject(answers.projectName, answers.template);
    // spinner.succeed(chalk.green(`\nProject ${answers.projectName} created successfully!`));
    // console.log(`\nRun the following commands to get started:-`);
    // console.log(`- ${chalk.yellow("npm install")}`);
    // console.log(`- ${chalk.yellow("npm run dev")}`);

    console.log("\n");
    spinner.succeed(`${chalk.green(`Project ${answers.projectName} created successfully!`)}\n\nRun the following commands to get started:-\n- ${chalk.yellow(`cd ${answers.projectName}`)}\n- ${chalk.yellow("npm install")}\n- ${chalk.yellow("npm run dev")}`);
  } catch (e) {
    console.log("Error: ", e)
    spinner.fail(chalk.red("Failed to create project."));
  }
}

init();

// program
//   .name('revv')
//   .version('1.0.0')
//   .description('CLI Tool for RevvJS');
// 
// program
//   .command('new <project-name>')
//   .description('Create a New RevvJS Project')
//   .action((projectName) => {
//     createNewProject(projectName);
//   });
// 
// program.parse(process.argv);
