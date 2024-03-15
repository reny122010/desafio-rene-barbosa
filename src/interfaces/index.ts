export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface ResponseTeam {
  team: Team;
}

export interface GoalStatistics {
  total: number;
  assists: number;
}

export interface PlayerStatistics {
  statistics: [{
    goals: GoalStatistics;
  }];
}

export interface ResponsePlayers {
  player: ResponsePlayer
}

export interface ResponsePlayer {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
}

export interface Player {
  id: number;
  name: string;
  photo: string;
}

export interface ResponsePlayer {
  player: Player;
}