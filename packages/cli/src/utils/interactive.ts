import inquirer from 'inquirer';
import { ICommandList, ICommandChoice } from '../types';

export async function choosePackageAndCommand(commands: ICommandList): Promise<ICommandChoice> {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageName',
      message: 'Select a package:',
      choices: Object.keys(commands),
    },
    {
      type: 'list',
      name: 'commandName',
      message: 'Select a command:',
      choices: (answers) => commands[answers.packageName],
    },
  ]);
  return answers as ICommandChoice;
}
