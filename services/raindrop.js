const Utilities = require("../utilities/index");

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

async function updateRaindropsByCollectionId(collectionId, params) {
  return Utilities.HelpersNetworkRequest.sendRequest(
    "raindrop",
    "put",
    "raindrops",
    collectionId,
    params
  );
}

//// custom methods
async function updateTagsInBulk() {
  const tags = await getTags(Utilities.Constants.RESOURCES_ID);
  const shouldBeUpdated = (element) =>
    element.parent["$id"] === Utilities.Constants.RESOURCES_ID;

  tags.items.forEach(async (element) => {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params = {
        tags: [title, "resources"],
        collectionId: Utilities.Constants.RESOURCES_ID,
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
    element.parent["$id"] === Utilities.Constants.RESOURCES_ID;

  collections.items.forEach(async (element) => {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params = {
        tags: [title, "resources"],
        collectionId: Utilities.Constants.RESOURCES_ID,
      };
      await updateRaindropsByCollectionId(_id, params);
      // await deleteCollectionById(_id);
    }
  });
}

module.exports = {
  bulkUpdateTagsInCollection,
  deleteCollectionById,
  deleteRaindropById,
  getCollectionById,
  getCollections,
  getRaindropsByCollectionId,
  getTags,
  renameTags,
  updateRaindropsByCollectionId,
  updateTagsInBulk,
};
