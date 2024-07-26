import { createRaindropAPI, RaindropAPI } from './api';
import { IRaindrop, ICollection, ITag, IUpdateTagsParams } from './types';
import { RAINDROP_CONSTANTS } from '@apiso/core';

export class RaindropClient {
  private api: RaindropAPI;

  constructor(apiKey: string) {
    this.api = createRaindropAPI(apiKey);
  }

  async createRaindrop(raindrop: IRaindrop): Promise<IRaindrop> {
    return this.api.createRaindrop(raindrop);
  }

  async createRaindrops(raindrops: IRaindrop[]): Promise<IRaindrop[]> {
    return this.api.createRaindrops(raindrops);
  }

  async deleteCollectionById(collectionId: string): Promise<unknown> {
    return this.api.deleteCollectionById(collectionId);
  }

  async deleteRaindropById(raindropId: string): Promise<unknown> {
    return this.api.deleteRaindropById(raindropId);
  }

  async getCollectionById(collectionId: string): Promise<ICollection> {
    return this.api.getCollectionById(collectionId);
  }

  async getCollections(): Promise<{ items: ICollection[] }> {
    return this.api.getCollections();
  }

  async getTags(collectionId: string | null = null): Promise<{ items: ITag[] }> {
    return this.api.getTags(collectionId);
  }

  async updateTags(
    params: IUpdateTagsParams,
    collectionId: string | null = null
  ): Promise<unknown> {
    return this.api.updateTags(params, collectionId);
  }

  async getRaindropsByCollectionId(collectionId: string): Promise<{ items: IRaindrop[] }> {
    return this.api.getRaindropsByCollectionId(collectionId);
  }

  async getRaindropById(raindropId: string): Promise<IRaindrop> {
    return this.api.getRaindropById(raindropId);
  }

  async updateRaindropsByCollectionId(
    collectionId: string,
    params: IUpdateTagsParams
  ): Promise<unknown> {
    return this.api.updateRaindropsByCollectionId(collectionId, params);
  }

  async updateTagsInBulk(): Promise<void> {
    const tags = await this.getTags(RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID);
    const shouldBeUpdated = (element: ITag) =>
      element.parent['$id'] === RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID;

    for (const element of tags.items) {
      if (shouldBeUpdated(element)) {
        const { title } = element;
        const params: IUpdateTagsParams = {
          tags: [title, 'resources'],
          collectionId: RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID,
        };
        await this.updateTags(params, RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID);
      }
    }
  }

  async bulkUpdateTagsInCollection(): Promise<void> {
    const collections = await this.getCollections();
    const shouldBeUpdated = (element: ICollection) =>
      element.parent['$id'] === RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID;

    for (const element of collections.items) {
      if (shouldBeUpdated(element)) {
        const { _id, title } = element;
        const params: IUpdateTagsParams = {
          tags: [title, 'resources'],
          collectionId: RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID,
        };
        await this.updateRaindropsByCollectionId(_id, params);
        // Uncomment the following line if you want to delete the collection after updating
        // await api.deleteCollectionById(_id);
      }
    }
  }
}

export function createRaindropClient(): RaindropClient {
  const apiKey = process.env.RAINDROP_API_KEY;
  if (!apiKey) {
    throw new Error('RAINDROP_API_KEY is not set in the environment variables');
  }
  return new RaindropClient(apiKey);
}
