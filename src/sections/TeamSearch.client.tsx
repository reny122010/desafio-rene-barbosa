"use client";
import axiosInstance from '@/utils/httpInstance';
import { ResponseTeam } from '@/interfaces/index';
import { useEffect } from 'react';

export default function TeamSearch({ inputTeam, setInputTeam, setTeams, setPhase }: any) {
  useEffect(() => {
    setInputTeam();
    setTeams();
  }, []);

  const handleInputChange = (event: any) => {
    setInputTeam(event.target.value);
  };

  const searchTeam = async () => {
    const { data } = await axiosInstance(`/teams?search=${inputTeam}`).catch(() => null);

    const teams = data.response.map(({ team }: ResponseTeam) => ({
      id: team.id,
      name: team.name,
      logo: team.logo,
    }))

    if (teams.length > 0) {
      setTeams(teams);
      setPhase(1)
    }
  };

  return (
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
  );
}