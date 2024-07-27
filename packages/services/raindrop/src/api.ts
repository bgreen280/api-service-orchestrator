import { BaseAPI, IAuthConfig, IConnectorConfig } from '@apiso/core';
import { IRaindrop, ICollection, ITag, IUpdateTagsParams } from './types';

export class RaindropAPI extends BaseAPI {
  constructor(authConfig: IAuthConfig, connectorConfig: IConnectorConfig) {
    super(authConfig, connectorConfig);
  }

  async createRaindrop(raindrop: IRaindrop): Promise<IRaindrop> {
    return this.request<IRaindrop>('POST', '/raindrop', raindrop);
  }

  async createRaindrops(raindrops: IRaindrop[]): Promise<IRaindrop[]> {
    return this.request<IRaindrop[]>('POST', '/raindrops', raindrops);
  }

  async deleteCollectionById(collectionId: string): Promise<unknown> {
    return this.request<unknown>('DELETE', `/collection/${collectionId}`);
  }

  async deleteRaindropById(raindropId: string): Promise<unknown> {
    return this.request<unknown>('DELETE', `/raindrop/${raindropId}`);
  }

  async getCollectionById(collectionId: string): Promise<ICollection> {
    return this.request<ICollection>('GET', `/collection/${collectionId}`);
  }

  async getCollections(): Promise<{ items: ICollection[] }> {
    return this.request<{ items: ICollection[] }>('GET', '/collections');
  }

  async getTags(collectionId: string | null = null): Promise<{ items: ITag[] }> {
    const endpoint = collectionId ? `/tags/${collectionId}` : '/tags';
    return this.request<{ items: ITag[] }>('GET', endpoint);
  }

  async updateTags(
    params: IUpdateTagsParams,
    collectionId: string | null = null
  ): Promise<unknown> {
    const endpoint = collectionId ? `/tags/${collectionId}` : '/tags';
    return this.request<unknown>('PUT', endpoint, params);
  }

  async getRaindropsByCollectionId(collectionId: string): Promise<{ items: IRaindrop[] }> {
    return this.request<{ items: IRaindrop[] }>('GET', `/raindrops/${collectionId}`);
  }

  async getRaindropById(raindropId: string): Promise<IRaindrop> {
    return this.request<IRaindrop>('GET', `/raindrop/${raindropId}`);
  }

  async updateRaindropsByCollectionId(
    collectionId: string,
    params: IUpdateTagsParams
  ): Promise<unknown> {
    return this.request<unknown>('PUT', `/raindrops/${collectionId}`, params);
  }
}
