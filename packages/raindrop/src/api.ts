import { RaindropClient } from './client';
import { Raindrop, Collection, Tag, UpdateTagsParams } from './types';

export class RaindropAPI {
  private client: RaindropClient;

  constructor(apiKey: string) {
    this.client = new RaindropClient(apiKey);
  }

  async createRaindrop(raindrop: Raindrop): Promise<Raindrop> {
    return this.client.createRaindrop(raindrop);
  }

  async createRaindrops(raindrops: Raindrop[]): Promise<Raindrop[]> {
    return this.client.createRaindrops(raindrops);
  }

  async deleteCollectionById(collectionId: string): Promise<unknown> {
    return this.client.deleteCollectionById(collectionId);
  }

  async deleteRaindropById(raindropId: string): Promise<unknown> {
    return this.client.deleteRaindropById(raindropId);
  }

  async getCollectionById(collectionId: string): Promise<Collection> {
    return this.client.getCollectionById(collectionId);
  }

  async getCollections(): Promise<{ items: Collection[] }> {
    return this.client.getCollections();
  }

  async getTags(collectionId: string | null = null): Promise<{ items: Tag[] }> {
    return this.client.getTags(collectionId);
  }

  async updateTags(params: UpdateTagsParams, collectionId: string | null = null): Promise<unknown> {
    return this.client.updateTags(params, collectionId);
  }

  async getRaindropsByCollectionId(collectionId: string): Promise<{ items: Raindrop[] }> {
    return this.client.getRaindropsByCollectionId(collectionId);
  }

  async getRaindropById(raindropId: string): Promise<Raindrop> {
    return this.client.getRaindropById(raindropId);
  }

  async updateRaindropsByCollectionId(collectionId: string, params: UpdateTagsParams): Promise<unknown> {
    return this.client.updateRaindropsByCollectionId(collectionId, params);
  }
}