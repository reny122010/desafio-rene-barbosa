"use client";
import axiosInstance from '@/utils/httpInstance';
import { Team, ResponsePlayers } from '@/interfaces/index';
import { useEffect, useState } from 'react';
import Toast from '@/components/Toast.client';

export default function PlayerSearch({ inputPlayer, selectedTeam, teams, setSelectedTeam, setInputPlayer, setPlayers, setPhase }: any) {
  const [errorisVisible, setErrorIsVisible] = useState(false);
  const [errorMenssage, seterrorMenssage] = useState('');

  useEffect(() => {
    setInputPlayer('');
    setPlayers([]);
    console.log('called')
  }, []);

  const handleChangeTeam = (event: any) => {
    setSelectedTeam(event.target.value);
  };

  const handleChangePlayer = (event: any) => {
    setInputPlayer(event.target.value);
  };

  const searchPlayers = async () => {
    const { data } = await axiosInstance(`/players?search=${inputPlayer}&season=2020&team=${selectedTeam}`).catch(() => seterrorMenssage('Problema na API'));

    const players = data.response.map(({ player }: ResponsePlayers) => ({
      id: player.id,
      name: `${player.firstname} ${player.lastname}`,
      photo: player.photo,
    }));

    if (players.length > 0) {
      setPlayers(players);
      setPhase(2)
    } else {
      seterrorMenssage('Não possui jogador com esse nome, faça uma nova pesquisa');
    }
  };

  const backStep = () => {
    setPhase(0)
  }

  return (
    <>
      <div className="flex space-x-4">
        <select
          value={selectedTeam}
          onChange={handleChangeTeam}
          className="block text-black w-full px-4 py-2 mt-2 border rounded-md bg-white border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option key='default' disabled selected defaultChecked>
            Selecione um time
          </option>
          {teams.map((team: Team) => (
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={backStep}
        >
          Voltar
        </button>
      </div>
      <Toast isVisible={errorisVisible} setIsVisible={setErrorIsVisible} message={errorMenssage} type='error' />
    </>
  );
}

