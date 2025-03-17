import { Biome } from '../entities/Biome';

export interface IBiomeRepository {
    save(biome: Biome): Promise<void>;
    findById(id: string): Promise<Biome | null>;
    findByType(type: string): Promise<Biome[]>;
    get(): Promise<Biome | null>;
    update(biome: Biome): Promise<void>;
    delete(id: string): Promise<void>;
} 