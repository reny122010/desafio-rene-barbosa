"use client"; // SearchComponent.client.tsx
import { useState } from 'react';

export default function SearchComponent() {
  const [searching, setSearching] = useState(false);

  const searchTeam = () => {
    setSearching(true);
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        {!searching && (
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Digite o nome do time"
              className="w-full text-black px-4 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={searchTeam}
            >
              Buscar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
