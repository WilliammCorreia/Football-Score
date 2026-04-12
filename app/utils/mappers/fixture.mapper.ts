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
      home: item.teams.home,
      away: item.teams.away,
    },
    goals: {
      home: item.goals.home,
      away: item.goals.away,
    },
  }));
}
