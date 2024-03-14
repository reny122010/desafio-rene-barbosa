"use client";
import { useState } from 'react';
import axios from 'axios';

import config from '@/utils/config';

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface ResponseTeam {
  team: Team;
}

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'x-rapidapi-key': config.API_KEY,
    'x-rapidapi-host': config.HOST,
  },
});

export default function SearchComponent() {
  const [searching, setSearching] = useState(false);
  const [inputTeam, setInputTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();

  const searchTeam = async () => {
    setSearching(true);

    const { data } = await axiosInstance(`/teams?search=${inputTeam}`).catch(() => null);

    setTeams(data.response.map(({ team }: ResponseTeam) => ({
      id: team.id,
      name: team.name,
      logo: team.logo,
    })))
  };
  const searchPlayers = async () => {
    setSearching(true);

    const { data } = await axiosInstance(`/teams?search=${inputTeam}`).catch(() => null);

    setTeams(data.response.map(({ team }: ResponseTeam) => ({
      id: team.id,
      name: team.name,
      logo: team.logo,
    })))
  };

  const handleInputChange = (event) => {
    setInputTeam(event.target.value);
  };


  const handleChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputTeam}
            onChange={handleInputChange}
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

        <div className="flex space-x-4">
          <select
            value={selectedTeam}
            onChange={handleChange}
            className="block text-black w-full px-4 py-2 mt-2 border rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={searchTeam}
          >

            Buscar Jogadores
          </button>
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            value={inputTeam}
            onChange={handleInputChange}
            placeholder="Digite o nome do jogador"
            className="w-full text-black px-4 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={searchTeam}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
