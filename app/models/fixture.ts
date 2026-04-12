import type { Team } from "./team";

export interface Fixture {
  fixture: {
    id: string;
    date: string;
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number;
    away: number;
  };
}

export interface FixtureResponse {
  response: Array<Fixture>;
}
