"use client";
import { useState } from 'react';
import axios from 'axios';

import config from '@/utils/config';

interface GoalStatistics {
  total: number;
  assists: number;
}

interface PlayerStatistics {
  statistics: [{
    goals: GoalStatistics;
  }];
}

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface ResponseTeam {
  team: Team;
}

interface Player {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
}

interface ResponsePlayer {
  player: Player;
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
  const [inputPlayer, setInputPlayer] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();

  const searchTeam = async () => {
    setSearching(true);

    const { data } = await axiosInstance(`/teams?search=${inputTeam}`).catch(() => null);

    setTeams(data.response.map(({ team }: ResponseTeam) => ({
      id: team.id,
      name: team.name,
      logo: team.logo,
    })));
  };

  const searchPlayers = async () => {
    setSearching(true);

    const { data } = await axiosInstance(`/players?search=${inputPlayer}&season=2020&team=${selectedTeam}`).catch(() => null);

    setPlayers(data.response.map(({ player }: ResponsePlayer) => ({
      id: player.id,
      name: `${player.firstname} ${player.lastname}`,
      photo: player.photo,
    })));
  };

  const calculateGoalsAndAssists = (input: PlayerStatistics) => {
    return input.statistics.reduce((acc, stat) => {
      const goals = stat.goals.total || 0;
      const assists = stat.goals.assists || 0;

      acc.goals += goals;
      acc.assists += assists;

      return acc;
    }, { goals: 0, assists: 0 });
  }

  const searchPlayerStatistic = async () => {
    const { data } = await axiosInstance(`/players?id=${selectedPlayer}&season=2020`).catch(() => null);

    const [response] = data.response;

    console.log(response)

    const { goals, assists } = calculateGoalsAndAssists(response);

    console.log(goals, assists)

  }

  const handleInputChange = (event) => {
    setInputTeam(event.target.value);
  };

  const handleChangeTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleChangePlayer = (event) => {
    setInputPlayer(event.target.value);
  };

  const handleChangePlayerSelected = (event) => {
    setSelectedPlayer(event.target.value);
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
            onChange={handleChangeTeam}
            className="block text-black w-full px-4 py-2 mt-2 border rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option key='default' disabled selected defaultChecked>
              Selecione um time
            </option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            value={inputPlayer}
            onChange={handleChangePlayer}
            placeholder="Digite o nome do jogador"
            className="w-full text-black px-4 py-2 rounded-md border-2 border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={searchPlayers}
          >
            Buscar Jogador
          </button>
        </div>

        <div className="flex space-x-4">
          <select
            value={selectedPlayer}
            onChange={handleChangePlayerSelected}
            className="block text-black w-full px-4 py-2 mt-2 border rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option key='default' disabled selected defaultChecked>
              Selecione um jogador
            </option>
            {players.map((player) => (
              <option key={player.id} value={player.id}>
                {player.name}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={searchPlayerStatistic}
          >
            Selecionar Jogador
          </button>
        </div>
      </div>
    </div>
  );
}
