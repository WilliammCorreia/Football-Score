import type { Team, TeamResponse, TeamVenue } from '@/models/team';

export function mapTeamResponseToTeams(response: TeamResponse): Team[] {
  return response.response.map(item => ({
    id: item.team.id,
    name: item.team.name,
    country: item.team.country,
    founded: item.team.founded,
    code: item.team.code,
    logo: item.team.logo,
    player: [],
  }));
}

export function mapTeamResponseToTeamVenues(response: TeamResponse): TeamVenue[] {
  return response.response.map(item => ({
    team: {
      id: item.team.id,
      name: item.team.name,
      country: item.team.country,
      founded: item.team.founded,
      code: item.team.code,
      logo: item.team.logo,
      player: [],
    },
    venue: {
      id: item.venue.id,
      name: item.venue.name,
      address: item.venue.address,
      city: item.venue.city,
      capacity: item.venue.capacity,
      surface: item.venue.surface,
      image: item.venue.image,
    },
  }));
}
