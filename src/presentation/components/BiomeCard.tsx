import React from 'react';
import { Biome } from '../../domain/entities/Biome';

interface BiomeCardProps {
  biome: Biome;
}

export const BiomeCard: React.FC<BiomeCardProps> = ({ biome }) => {
  return (
    <div className="p-4 border rounded-lg shadow bg-white hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{biome.name}</h2>
      <p className="text-gray-600 mb-4">{biome.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-sm text-gray-500">Temperature:</span>
          <span className="ml-2 font-medium">{biome.temperature}°C</span>
        </div>
        <div>
          <span className="text-sm text-gray-500">Humidity:</span>
          <span className="ml-2 font-medium">{biome.humidity}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Flora:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {biome.flora.map((plant, index) => (
              <li key={index}>{plant}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Fauna:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {biome.fauna.map((animal, index) => (
              <li key={index}>{animal}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}; 