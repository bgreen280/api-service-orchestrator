#!/usr/bin/env node

import { Command } from 'commander';
import { choosePackageAndCommand } from './utils/interactive';
import { getCommandsFromPackages } from './utils/commands';
import { loadConfig } from './utils/config';
import * as commands from '@apiso/commands';
import { ICliConfig, ICommands } from './types';

const program = new Command();

program
  .name('apiso')
  .description('CLI to manage various API integrations')
  .version('0.1.0');

// 1. Direct Command Execution (e.g., apiso youtube getPlaylists)
program
  .command('<package-name> <command>')
  .description('Run a specific command from a package')
  .action(async (packageName: string, commandName: string) => {
    const config: ICliConfig = await loadConfig();
    const command = (commands as ICommands)[`${packageName}${commandName}`];
    if (command) {
      await command(config);
    } else {
      console.error(
        `Command ${commandName} not found in package ${packageName}`,
      );
    }
  });

// 2. Interactive Mode (yarn start or apiso)
program
  .command('start')
  .description('Start the interactive CLI')
  .action(async () => {
    const commandList = await getCommandsFromPackages();
    const { packageName, commandName } =
      await choosePackageAndCommand(commandList);
    const config: ICliConfig = await loadConfig();
    const command = (commands as ICommands)[`${packageName}${commandName}`];
    if (command) {
      await command(config);
    } else {
      console.error(
        `Command ${commandName} not found in package ${packageName}`,
      );
    }
  });

// 3. Additional Commands (e.g., apiso migrateYoutubePlaylistItemsToRaindrop)
program
  .command('migrateYoutubePlaylistItemsToRaindrop')
  .description('Migrate YouTube playlists to Raindrop')
  .action(async () => {
    const config = await loadConfig();
    await commands.migrateYoutubePlaylistItemsToRaindrop(
      config.youtube.auth,
      config.youtube.connector,
      config.raindrop.auth,
      config.raindrop.connector,
    );
  });

program.parse(process.argv);
