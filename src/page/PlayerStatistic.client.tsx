"use client";
import { useEffect, useState } from 'react';

import TeamSearch from '@/sections/TeamSearch.client';
import PlayerSearch from '@/sections/PlayerSearch.client';
import SelectPlayer from '@/sections/SelectPlayer.client';
import Level from '@/sections/Level.client';

export default function PlayerStatistic() {
  const [phase, setPhase] = useState(0);

  const [inputTeam, setInputTeam] = useState('');
  const [inputPlayer, setInputPlayer] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [statistic, setStatistic] = useState();

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        {phase === 0 &&
          <TeamSearch
            inputTeam={inputTeam}
            setInputTeam={setInputTeam}
            setTeams={setTeams}
            setPhase={setPhase}
          />
        }

        {phase === 1 &&
          <PlayerSearch
            inputPlayer={inputPlayer}
            selectedPlayer={selectedPlayer}
            teams={teams}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            setInputPlayer={setInputPlayer}
            setPlayers={setPlayers}
            setPhase={setPhase}
          />
        }

        {phase === 2 &&
          <SelectPlayer
            selectedPlayer={selectedPlayer}
            players={players}
            setSelectedPlayer={setSelectedPlayer}
            setStatistic={setStatistic}
            setPhase={setPhase} />
        }

        {phase === 3 &&
          <Level statistic={statistic} setPhase={setPhase} playerId={selectedPlayer} />
        }
      </div>
    </div>
  );
}
