"use client";
import axiosInstance from '@/utils/httpInstance';
import { ResponseTeam } from '@/interfaces/index';
import { useEffect, useState } from 'react';
import Toast from '@/components/Toast.client';

export default function TeamSearch({ inputTeam, setInputTeam, setTeams, setPhase }: any) {
  const [errorisVisible, setErrorIsVisible] = useState(false);
  const [errorMenssage, seterrorMenssage] = useState('');

  useEffect(() => {
    setInputTeam('');
    setTeams([]);
  }, []);

  useEffect(() => {
    setErrorIsVisible(true);
  }, [errorMenssage])

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
    console.log(data.errors)

    if (data.errors) {
      seterrorMenssage('Problema na API');
    }
    else if (teams.length > 0) {
      setTeams(teams);
      setPhase(1)
    } else {
      seterrorMenssage('Não possui time com esse nome, faça uma nova pesquisa!');
    }
  };

  return (
    <>
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
      <Toast isVisible={errorisVisible} setIsVisible={setErrorIsVisible} message={errorMenssage} type='error' />
    </>
  );
}