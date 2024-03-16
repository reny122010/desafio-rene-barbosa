"use client";
import axiosInstance from '@/utils/httpInstance';
import { Player, PlayerStatistics } from '@/interfaces/index';
import React, { useState, useEffect } from 'react';
import config from '@/utils/config';
import Toast from '@/components/Toast.client';

export default function SelectPlayer({ selectedPlayer, players, setSelectedPlayer, setStatistic, setPhase }: any) {
  const [playersSheets, setPlayers] = useState([]);
  const [errorisVisible, setErrorIsVisible] = useState(false);
  const [errorMenssage, seterrorMenssage] = useState('');

  useEffect(() => {
    setStatistic();

    function initClient() {
      window.gapi.client.init({
        apiKey: config.GOOGLE_KEY,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      }).then(function () {
        loadPlayers();
      });
    }

    function loadPlayers() {
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.SPREADSHEET_ID,
        range: 'jogadores!A2:B', // Ajuste o intervalo conforme necessário
      }).then(function (response) {
        const range = response.result;
        if (range.values.length > 0) {
          setPlayers(range.values);
        } else {
          console.log('Nenhum dado encontrado.');
        }
      }, function (response) {
        seterrorMenssage('Erro ao buscar dados na planilh');
        console.error('Erro ao buscar dados: ' + response.result.error.message);
      });
    }

    window.gapi.load('client', initClient);
  }, []);

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
    const { data } = await axiosInstance(`/players?id=${selectedPlayer}&season=2020`).catch(() => seterrorMenssage('Problema na API'));

    const [response] = data.response;

    const { goals, assists } = calculateGoalsAndAssists(response);
    const player = playersSheets.find(([id, _]) => id === selectedPlayer);
    const appearances = player ? parseInt(player[1]) : 0;

    setStatistic({ goals, assists, appearances });
    setPhase(3);
  }

  const backStep = () => {
    setPhase(1)
  }

  return (
    <>
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

