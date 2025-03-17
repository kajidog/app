import React, { useEffect, useState } from 'react';
import { Biome } from '../../domain/entities/Biome';
import { BiomeCard } from '../components/BiomeCard';
import { GetBiomeUseCase } from '../../application/useCases/biome/GetBiomeUseCase';
import { ChromeStorageBiomeRepository } from '../../infrastructure/repositories/ChromeStorageBiomeRepository';

export const BiomeList: React.FC = () => {
  const [biomes, setBiomes] = useState<Biome[]>([]);
  const [loading, setLoading] = useState(true);
  const biomeRepository = new ChromeStorageBiomeRepository();
  const getBiomeUseCase = new GetBiomeUseCase(biomeRepository);

  useEffect(() => {
    const loadBiomes = async () => {
      try {
        const biomeList = await getBiomeUseCase.executeByType('style');
        setBiomes(biomeList);
      } catch (error) {
        console.error('Failed to load biomes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBiomes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Style Biomes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {biomes.map((biome) => (
          <BiomeCard key={biome.id} biome={biome} />
        ))}
      </div>
    </div>
  );
}; 