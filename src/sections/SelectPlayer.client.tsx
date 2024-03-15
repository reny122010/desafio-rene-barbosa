"use client";
import axiosInstance from '@/utils/httpInstance';
import { Team, ResponsePlayer, Player, PlayerStatistics } from '@/interfaces/index';

export default function SelectPlayer({ selectedPlayer, players, setSelectedPlayer }: any) {

  const handleChangePlayerSelected = (event: any) => {
    setSelectedPlayer(event.target.value);
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

  return (
    <div className="flex space-x-4">
      <select
        value={selectedPlayer}
        onChange={handleChangePlayerSelected}
        className="block text-black w-full px-4 py-2 mt-2 border rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      >
        <option key='default' disabled selected defaultChecked>
          Selecione um jogador
        </option>
        {players.map((player: Player) => (
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
  );
}

