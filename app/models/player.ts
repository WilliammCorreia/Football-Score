export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

interface PlayerStat {
  player: Player;
}

export interface PlayerResponse {
  response: PlayerStat[];
}
