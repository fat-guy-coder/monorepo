#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import fs from 'fs';
// import path from 'path';
import { execSync } from 'child_process';
import { promisify } from 'util';


async function getFiles (path) {
  const files = await fs.readFile(path, 'utf-8');
  console.log(files);
  return files;
}

// getFiles(path.resolve(process.cwd(), './pnpm-workspace.yaml'))


program
  .name('gen')
  .description('我的命令行工具')
  .version('1.0.0');

// program
//   .command('generate <appName>', 'g', '生成一个项目')
//   .option('-t, --turborepo', '是否使用turborepo')
//   .option('-p, --projectPath', '要生成项目文件夹路径，默认是./app')
//   .action((appName, options) => {
//     //读取文件夹中的文件列表
//     if (options.projectPath) {
//       const files = fs.readdirSync(options.projectPath ? options.projectPath : './app');
//     } else {
//       console.log('请输入要生成项目文件夹名称');
//     }
//     console.log(name, options);
//   });


program
  .command('build')
  .description('构建所有或者指定项目')
  .option('-s, --sourceRootPath', '源码根目录路径，默认是./apps')
  .option('-d, --distRootPath', '构建输出目录路径，默认是./dist')
  .action(async (name, options) => {
    const files = fs.readdirSync(options.sourceRootPath ? options.sourceRootPath : './apps');
    const question = [
      {
        type: 'list',
        name: 'buildProject',
        message: '请选择构建项目',
        choices: ['all', ...files]
      },
      {
        type: 'checkbox',
        name: 'buildEngine',
        message: '请选择构建引擎',
        choices: [chalk.green('webpack'), chalk.blue('vite'), chalk.yellow('turborepo')]
      },
      {
        type: 'confirm',
        name: 'isBuild',
        message: '确认构建吗？',
        default: true
      }
    ]
    const answers = await inquirer.prompt(question);
    const buildOra = ora({
      text: '构建中...',
      spinner: 'dots',
    }).start();
    if (answers.buildProject === 'all') {

      const execFileAsync = promisify(execSync);
      await execFileAsync('pnpm', ['build'], {}).then(({ stdout, stderr }) => {
        console.log(stdout, stderr);
      });
    } else {
      const execFileAsync = promisify(execSync);
      await execFileAsync('pnpm', ['run', 'build:' + answers.buildProject],).then(({ stdout, stderr }) => {
        console.log(stdout);
        console.log(stderr);
      });
    }

    console.log(chalk.green('你选择了' + answers.buildProject + '项目' + "通过" + answers.buildEngine + "构建"));

    buildOra.succeed('构建成功!');
  });


program.parse(process.argv);