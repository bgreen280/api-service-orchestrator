#!/usr/bin/env node

import { Command } from 'commander';
import { migrateYoutubePlaylistItemsToRaindrop } from './commands';

const program = new Command();

program
  .name('api-service-orchestrator')
  .description('CLI to manage various API integrations')
  .version('0.1.0');

program
  .command('migrate')
  .description('Migrate YouTube playlists to Raindrop')
  .action(async () => {
    const result = await migrateYoutubePlaylistItemsToRaindrop();
    if (result.success) {
      console.log(result.message);
    } else {
      console.error(result.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
