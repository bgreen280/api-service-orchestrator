import { ICommandList } from '../types';
import * as commands from '@apiso/commands';

export async function getCommandsFromPackages(): Promise<ICommandList> {
  const commandList: ICommandList = {};

  for (const [key] of Object.entries(commands)) {
    const [packageName, commandName] = key.split(/(?=[A-Z])/);
    commandList[packageName] = [];
    commandList[packageName].push(commandName);
  }

  return commandList;
}
