import * as Utilities from "../utilities/index";
import { CreateServiceClient } from "../utilities/index";

// NETWORK REQUESTS
const raindropClient = CreateServiceClient("raindrop");

interface Raindrop {
  tags: string[];
  collection: {
    $ref: string,
    $id: string,
    oid: string,
  };
  type: string;
  title: string;
  link: string;
  excerpt: string;
}

interface Tag {
  _id: string;
  title: string;
  parent: {
    $id: string,
  };
}

interface Collection {
  _id: string;
  title: string;
  parent: {
    $id: string,
  };
}

interface UpdateTagsParams {
  tags: string[];
  collectionId: string;
}

/**
 * Create a new raindrop.
 * @param raindrop - The raindrop data to create.
 * @returns The created raindrop.
 */
async function createRaindrop(raindrop: Raindrop): Promise<Raindrop> {
  return raindropClient.sendRequest("post", "raindrop", null, raindrop);
}

/**
 * Create multiple raindrops.
 * @param raindrops - The raindrops data to create.
 * @returns The created raindrops.
 */
async function createRaindrops(raindrops: Raindrop[]): Promise<Raindrop[]> {
  return raindropClient.sendRequest("post", "raindrops", null, raindrops);
}

/**
 * Delete a collection by ID.
 * @param collectionId - The ID of the collection to delete.
 * @returns The deletion result.
 */
async function deleteCollectionById(collectionId: string): Promise<unknown> {
  return raindropClient.sendRequest("delete", "collection", collectionId);
}

/**
 * Delete a raindrop by ID.
 * @param raindropId - The ID of the raindrop to delete.
 * @returns The deletion result.
 */
async function deleteRaindropById(raindropId: string): Promise<unknown> {
  return raindropClient.sendRequest("delete", "raindrop", raindropId);
}

/**
 * Get a collection by ID.
 * @param collectionId - The ID of the collection to retrieve.
 * @returns The collection data.
 */
async function getCollectionById(collectionId: string): Promise<Collection> {
  return raindropClient.sendRequest("get", "collection", collectionId);
}

/**
 * Get all collections.
 * @returns The list of collections.
 */
async function getCollections(): Promise<{ items: Collection[] }> {
  return raindropClient.sendRequest("get", "collections");
}

/**
 * Get tags, optionally filtered by collection ID.
 * @param collectionId - The ID of the collection to filter tags by.
 * @returns The list of tags.
 */
async function getTags(
  collectionId: string | null = null
): Promise<{ items: Tag[] }> {
  return raindropClient.sendRequest("get", "tags", collectionId);
}

/**
 * Rename tags.
 * @param params - The parameters for renaming tags.
 * @param collectionId - The ID of the collection to filter tags by.
 * @returns The result of renaming tags.
 */
async function updateTags(
  params: UpdateTagsParams,
  collectionId: string | null = null
): Promise<unknown> {
  return raindropClient.sendRequest("put", "tags", collectionId, params);
}

/**
 * Get raindrops by collection ID.
 * @param collectionId - The ID of the collection to retrieve raindrops from.
 * @returns The list of raindrops.
 */
async function getRaindropsByCollectionId(
  collectionId: string
): Promise<{ items: Raindrop[] }> {
  return raindropClient.sendRequest("get", "raindrops", collectionId);
}

/**
 * Get a raindrop by ID.
 * @param raindropId - The ID of the raindrop to retrieve.
 * @returns The raindrop data.
 */
async function getRaindropById(raindropId: string): Promise<Raindrop> {
  return raindropClient.sendRequest("get", "raindrop", raindropId);
}

/**
 * Update raindrops by collection ID.
 * @param collectionId - The ID of the collection to update raindrops for.
 * @param params - The parameters for updating raindrops.
 * @returns The result of the update.
 */
async function updateRaindropsByCollectionId(
  collectionId: string,
  params: UpdateTagsParams
): Promise<unknown> {
  return raindropClient.sendRequest("put", "raindrops", collectionId, params);
}

// CUSTOM FUNCTIONS
async function updateTagsInBulk(): Promise<void> {
  const tags = await getTags(
    Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID
  );
  const shouldBeUpdated = (element: Tag) =>
    element.parent["$id"] ===
    Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID;

  tags.items.forEach(async (element) => {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params: UpdateTagsParams = {
        tags: [title, "resources"],
        collectionId:
          Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      };
    }
  });
}

/**
 * Adds a collection as a tag, moves raindrop to resources, and deletes the collection.
 */
async function bulkUpdateTagsInCollection(): Promise<void> {
  const collections = await getCollections();
  const shouldBeUpdated = (element: Collection) =>
    element.parent["$id"] ===
    Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID;

  collections.items.forEach(async (element) => {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params: UpdateTagsParams = {
        tags: [title, "resources"],
        collectionId:
          Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      };
      await updateRaindropsByCollectionId(_id, params);
      // await deleteCollectionById(_id);
    }
  });
}

interface YoutubePlaylistItem {
  snippet: {
    description: string,
    title: string,
    resourceId: {
      videoId: string,
    },
  };
}

/**
 * Constructs a raindrop from a YouTube playlist item.
 * @param playlistTitle - The title of the playlist.
 * @param playlistItem - The playlist item object.
 * @returns The constructed raindrop object.
 */
function constructRaindropFromYoutubePlaylistItem(
  playlistTitle: string,
  {
    snippet: {
      description,
      title: videoTitle,
      resourceId: { videoId },
    },
  }: YoutubePlaylistItem
): Raindrop {
  return {
    tags: ["resources", playlistTitle],
    collection: {
      $ref: "collections",
      $id: Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      oid: Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
    },
    type: "video",
    title: videoTitle,
    link: `https://www.youtube.com/watch?v=${videoId}`,
    excerpt: description,
  };
}

const RaindropService = {
  constructRaindropFromYoutubePlaylistItem,
  createRaindrop,
  createRaindrops,
  deleteCollectionById,
  deleteRaindropById,
  getCollectionById,
  getCollections,
  getRaindropById,
  getRaindropsByCollectionId,
  getTags,
  bulkUpdateTagsInCollection,
  updateTagsInBulk,
  updateTags,
  updateRaindropsByCollectionId,
};

export {
  constructRaindropFromYoutubePlaylistItem,
  createRaindrop,
  createRaindrops,
  deleteCollectionById,
  deleteRaindropById,
  getCollectionById,
  getCollections,
  getRaindropById,
  getRaindropsByCollectionId,
  getTags,
  bulkUpdateTagsInCollection,
  updateTagsInBulk,
  updateTags,
  updateRaindropsByCollectionId,
  RaindropService,
};
