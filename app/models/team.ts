import type { Player } from './player';

export interface Team {
  id: number;
  name: string;
  country: string;
  founded: number;
  code: string;
  logo: string;
  player: Player[];
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

export interface TeamVenue {
  team: Team;
  venue: Venue;
}

export interface TeamResponse {
  response: Array<TeamVenue>;
}
