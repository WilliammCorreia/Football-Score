import type { Fixture, FixtureResponse } from '@/models/fixture';

export function mapFixtureResponseToFixtures(response: FixtureResponse): Fixture[] {
  return response.response.map(item => ({
    fixture: {
      id: item.fixture.id,
      date: item.fixture.date,
      venue: {
        id: item.fixture.venue.id,
        name: item.fixture.venue.name,
        city: item.fixture.venue.city,
      },
      status: {
        long: item.fixture.status.long,
        short: item.fixture.status.short,
        elapsed: item.fixture.status.elapsed,
      },
    },
    league: {
      id: item.league.id,
      name: item.league.name,
      country: item.league.country,
      logo: item.league.logo,
      flag: item.league.flag,
    },
    teams: {
      home: {
        id: item.teams.home.id,
        name: item.teams.home.name,
        logo: item.teams.home.logo,
        winner: item.teams.home.winner,
      },
      away: {
        id: item.teams.away.id,
        name: item.teams.away.name,
        logo: item.teams.away.logo,
        winner: item.teams.away.winner,
      },
    },
    goals: {
      home: item.goals.home,
      away: item.goals.away,
    },
  }));
}
