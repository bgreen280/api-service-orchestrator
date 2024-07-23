import { Collection, Tag, UpdateTagsParams } from './types';
import { RaindropAPI } from './api';

export const CONSTANTS = {
  RAINDROP: {
    RAINDROP_RESOURCES_ID: 'your-resources-id-here',
  },
};

export async function updateTagsInBulk(api: RaindropAPI): Promise<void> {
  const tags = await api.getTags(CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID);
  const shouldBeUpdated = (element: Tag) =>
    element.parent["$id"] === CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID;

  for (const element of tags.items) {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params: UpdateTagsParams = {
        tags: [title, "resources"],
        collectionId: CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      };
      await api.updateTags(params, CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID);
    }
  }
}

export async function bulkUpdateTagsInCollection(api: RaindropAPI): Promise<void> {
  const collections = await api.getCollections();
  const shouldBeUpdated = (element: Collection) =>
    element.parent["$id"] === CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID;

  for (const element of collections.items) {
    if (shouldBeUpdated(element)) {
      const { _id, title } = element;
      const params: UpdateTagsParams = {
        tags: [title, "resources"],
        collectionId: CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      };
      await api.updateRaindropsByCollectionId(_id, params);
      // Uncomment the following line if you want to delete the collection after updating
      // await api.deleteCollectionById(_id);
    }
  }
}