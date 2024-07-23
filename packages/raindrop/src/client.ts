import { BaseClient, ServiceConfig } from '@apiso/core';
import { Raindrop, Collection, Tag, UpdateTagsParams } from './types';

export class RaindropClient extends BaseClient {
  constructor(apiKey: string) {
    const config: ServiceConfig = {
      auth: {
        type: 'apiKey',
        apiKey: apiKey,
      },
      baseUrl: 'https://api.raindrop.io/rest/v1',
    };
    super(config);
  }

  async createRaindrop(raindrop: Raindrop): Promise<Raindrop> {
    return this.request<Raindrop>('POST', '/raindrop', raindrop);
  }

  async createRaindrops(raindrops: Raindrop[]): Promise<Raindrop[]> {
    return this.request<Raindrop[]>('POST', '/raindrops', raindrops);
  }

  async deleteCollectionById(collectionId: string): Promise<unknown> {
    return this.request<unknown>('DELETE', `/collection/${collectionId}`);
  }

  async deleteRaindropById(raindropId: string): Promise<unknown> {
    return this.request<unknown>('DELETE', `/raindrop/${raindropId}`);
  }

  async getCollectionById(collectionId: string): Promise<Collection> {
    return this.request<Collection>('GET', `/collection/${collectionId}`);
  }

  async getCollections(): Promise<{ items: Collection[] }> {
    return this.request<{ items: Collection[] }>('GET', '/collections');
  }

  async getTags(collectionId: string | null = null): Promise<{ items: Tag[] }> {
    const endpoint = collectionId ? `/tags/${collectionId}` : '/tags';
    return this.request<{ items: Tag[] }>('GET', endpoint);
  }

  async updateTags(params: UpdateTagsParams, collectionId: string | null = null): Promise<unknown> {
    const endpoint = collectionId ? `/tags/${collectionId}` : '/tags';
    return this.request<unknown>('PUT', endpoint, params);
  }

  async getRaindropsByCollectionId(collectionId: string): Promise<{ items: Raindrop[] }> {
    return this.request<{ items: Raindrop[] }>('GET', `/raindrops/${collectionId}`);
  }

  async getRaindropById(raindropId: string): Promise<Raindrop> {
    return this.request<Raindrop>('GET', `/raindrop/${raindropId}`);
  }

  async updateRaindropsByCollectionId(
    collectionId: string,
    params: UpdateTagsParams
  ): Promise<unknown> {
    return this.request<unknown>('PUT', `/raindrops/${collectionId}`, params);
  }
}
