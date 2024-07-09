const Utilities = require("../utilities/index");
const { CreateServiceClient } = require("../utilities/index");

//// NETWORK REQUESTS
const raindropClient = CreateServiceClient("raindrop");

/**
 * Create a new raindrop.
 * @param {Object} raindrop - The raindrop data to create.
 * @returns {Promise<Object>} The created raindrop.
 */
async function createRaindrop(raindrop) {
  return raindropClient.sendRequest("post", "raindrop", null, raindrop);
}

/**
 * Create multiple raindrops.
 * @param {Array<Object>} raindrops - The raindrops data to create.
 * @returns {Promise<Object>} The created raindrops.
 */
async function createRaindrops(raindrops) {
  return raindropClient.sendRequest("post", "raindrops", null, raindrops);
}

/**
 * Delete a collection by ID.
 * @param {string} collectionId - The ID of the collection to delete.
 * @returns {Promise<Object>} The deletion result.
 */
async function deleteCollectionById(collectionId) {
  return raindropClient.sendRequest("delete", "collection", collectionId);
}

/**
 * Delete a raindrop by ID.
 * @param {string} raindropId - The ID of the raindrop to delete.
 * @returns {Promise<Object>} The deletion result.
 */
async function deleteRaindropById(raindropId) {
  return raindropClient.sendRequest("delete", "raindrop", raindropId);
}

/**
 * Get a collection by ID.
 * @param {string} collectionId - The ID of the collection to retrieve.
 * @returns {Promise<Object>} The collection data.
 */
async function getCollectionById(collectionId) {
  return raindropClient.sendRequest("get", "collection", collectionId);
}

/**
 * Get all collections.
 * @returns {Promise<Array<Object>>} The list of collections.
 */
async function getCollections() {
  return raindropClient.sendRequest("get", "collections");
}

/**
 * Get tags, optionally filtered by collection ID.
 * @param {string|null} [collectionId=null] - The ID of the collection to filter tags by.
 * @returns {Promise<Array<Object>>} The list of tags.
 */
async function getTags(collectionId = null) {
  return raindropClient.sendRequest("get", "tags", collectionId);
}

/**
 * Rename tags.
 * @param {Object} params - The parameters for renaming tags.
 * @param {string|null} [collectionId=null] - The ID of the collection to filter tags by.
 * @returns {Promise<Object>} The result of renaming tags.
 */
async function updateTags(params, collectionId = null) {
  return raindropClient.sendRequest("put", "tags", collectionId, params);
}

/**
 * Get raindrops by collection ID.
 * @param {string} collectionId - The ID of the collection to retrieve raindrops from.
 * @returns {Promise<Array<Object>>} The list of raindrops.
 */
async function getRaindropsByCollectionId(collectionId) {
  return raindropClient.sendRequest("get", "raindrops", collectionId);
}

/**
 * Get a raindrop by ID.
 * @param {string} raindropId - The ID of the raindrop to retrieve.
 * @returns {Promise<Object>} The raindrop data.
 */
async function getRaindropById(raindropId) {
  return raindropClient.sendRequest("get", "raindrop", raindropId);
}

/**
 * Update raindrops by collection ID.
 * @param {string} collectionId - The ID of the collection to update raindrops for.
 * @param {Object} params - The parameters for updating raindrops.
 * @returns {Promise<Object>} The result of the update.
 */
async function updateRaindropsByCollectionId(collectionId, params) {
  return raindropClient.sendRequest("put", "raindrops", collectionId, params);
}

//// CUSTOM FUNCTIONS
async function updateTagsInBulk() {
  const tags = await getTags(
    Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID
  );
  const shouldBeUpdated = (element) =>
    element.parent["$id"] ===
    Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID;

  tags.items.forEach(async (element) => {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params = {
        tags: [title, "resources"],
        collectionId:
          Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      };
    }
  });
}

/**
 * Adds a collection as a tag, moves raindrop to resources, and deletes the collection.
 * // addCollectionAsTag, moveRaindropToResources, deleteCollection
 * @returns {Promise<void>}
 */
async function bulkUpdateTagsInCollection() {
  const collections = await getCollections();
  const shouldBeUpdated = (element) =>
    element.parent["$id"] ===
    Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID;

  collections.items.forEach(async (element) => {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params = {
        tags: [title, "resources"],
        collectionId:
          Utilities.Statics.CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      };
      await updateRaindropsByCollectionId(_id, params);
      // await deleteCollectionById(_id);
    }
  });
}

/**
 * Constructs a raindrop from a YouTube playlist item.
 * @param {string} playlistTitle - The title of the playlist.
 * @param {Object} playlistItem - The playlist item object.
 * @returns {Object} The constructed raindrop object.
 */
function constructRaindropFromYoutubePlaylistItem(
  playlistTitle,
  {
    snippet: {
      description,
      title: videoTitle,
      resourceId: { videoId },
    },
  }
) {
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

module.exports = {
  constructRaindropFromYoutubePlaylistItem:
    RaindropService.constructRaindropFromYoutubePlaylistItem,
  createRaindrop: RaindropService.createRaindrop,
  createRaindrops: RaindropService.createRaindrops,
  deleteCollectionById: RaindropService.deleteCollectionById,
  deleteRaindropById: RaindropService.deleteRaindropById,
  getCollectionById: RaindropService.getCollectionById,
  getCollections: RaindropService.getCollections,
  getRaindropById: RaindropService.getRaindropById,
  getRaindropsByCollectionId: RaindropService.getRaindropsByCollectionId,
  getTags: RaindropService.getTags,
  bulkUpdateTagsInCollection: RaindropService.bulkUpdateTagsInCollection,
  updateTagsInBulk: RaindropService.updateTagsInBulk,
  updateTags: RaindropService.updateTags,
  updateRaindropsByCollectionId: RaindropService.updateRaindropsByCollectionId,
  RaindropService,
};
