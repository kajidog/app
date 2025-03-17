import { IBiomeRepository } from '../../../domain/repositories/IBiomeRepository';
import { Biome } from '../../../domain/entities/Biome';

export class GetBiomeUseCase {
  constructor(private readonly biomeRepository: IBiomeRepository) {}

  async execute(id: string): Promise<Biome | null> {
    return this.biomeRepository.findById(id);
  }

  async executeByType(type: string): Promise<Biome[]> {
    return this.biomeRepository.findByType(type);
  }
} 