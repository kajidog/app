/// <reference types="chrome" />

import { IBiomeRepository } from '../../domain/repositories/IBiomeRepository';
import { Biome } from '../../domain/entities/Biome';

export class ChromeStorageBiomeRepository implements IBiomeRepository {
  private readonly STORAGE_KEY = 'biomes';

  async findById(id: string): Promise<Biome | null> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const biomes = result[this.STORAGE_KEY] || {};
    const biomeData = biomes[id];

    if (!biomeData) return null;

    return new Biome(biomeData);
  }

  async findByType(type: string): Promise<Biome[]> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const biomes = result[this.STORAGE_KEY] || {};
    
    return Object.values(biomes)
      .filter((biome: any) => biome.type === type)
      .map((biomeData: any) => new Biome(biomeData));
  }

  async get(): Promise<Biome | null> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const biomes = result[this.STORAGE_KEY] || {};
    const biomeIds = Object.keys(biomes);
    
    if (biomeIds.length === 0) return null;
    
    // 最初のバイオームを返す
    return new Biome(biomes[biomeIds[0]]);
  }

  async save(biome: Biome): Promise<void> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const biomes = result[this.STORAGE_KEY] || {};
    
    biomes[biome.id] = {
      id: biome.id,
      name: biome.name,
      description: biome.description,
      temperature: biome.temperature,
      humidity: biome.humidity,
      flora: biome.flora,
      fauna: biome.fauna,
    };

    await chrome.storage.local.set({ [this.STORAGE_KEY]: biomes });
  }

  async update(biome: Biome): Promise<void> {
    await this.save(biome); // 更新は保存と同じ処理を行う
  }

  async delete(id: string): Promise<void> {
    const result = await chrome.storage.local.get(this.STORAGE_KEY);
    const biomes = result[this.STORAGE_KEY] || {};
    
    delete biomes[id];
    
    await chrome.storage.local.set({ [this.STORAGE_KEY]: biomes });
  }
} 