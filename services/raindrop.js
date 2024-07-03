const Utilities = require("../utilities/index");

//// NETWORK REQUESTS
async function createRaindrop(raindrop) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "post",
    "raindrop",
    null,
    raindrop
  );
}

async function createRaindrops(raindrops) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "post",
    "raindrops",
    null,
    raindrops
  );
}

async function deleteCollectionById(collectionId) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "delete",
    "collection",
    collectionId
  );
}

async function deleteRaindropById(raindropId) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "delete",
    "raindrop",
    raindropId
  );
}

async function getCollectionById(collectionId) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "get",
    "collection",
    collectionId
  );
}

async function getCollections() {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "get",
    "collections"
  );
}

async function getTags(collectionId = null) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "get",
    "tags",
    collectionId
  );
}

async function renameTags(params, collectionId = null) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "put",
    "tags",
    collectionId,
    params
  );
}

async function getRaindropsByCollectionId(collectionId) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "get",
    "raindrops",
    collectionId
  );
}

async function getRaindropById(raindropId) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "get",
    "raindrop",
    raindropId
  );
}

async function updateRaindropsByCollectionId(collectionId, params) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "put",
    "raindrops",
    collectionId,
    params
  );
}

////
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
 * addCollectionAsTag, moveRaindropToResources, deleteCollection
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

module.exports = {
  bulkUpdateTagsInCollection,
  constructRaindropFromYoutubePlaylistItem,
  createRaindrop,
  createRaindrops,
  deleteCollectionById,
  deleteRaindropById,
  getCollectionById,
  getCollections,
  getRaindropsByCollectionId,
  getTags,
  renameTags,
  updateRaindropsByCollectionId,
  updateTagsInBulk,
  getRaindropById,
};
