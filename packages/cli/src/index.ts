// import * as Scripts from './scripts/index';

async function main(): Promise<string> {
  try {
    // await Scripts.migrateYoutubePlaylistsToRaindrop();
    return "complete";
  } catch (error) {
    console.error(
      "Failed to fetch collections:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(
    "Unhandled error in main function:",
    error instanceof Error ? error.message : String(error)
  );
  process.exit(1);
});
