import type { TeamResponse, TeamVenue } from '@/models/team';
import type { PlayerResponse } from '@/models/player';
import { mapTeamResponseToTeamVenues } from '@/utils/mappers/team.mapper';
import { mapPlayerResponseToPlayer } from '@/utils/mappers/player.mapper';

export default defineEventHandler(async (event): Promise<TeamVenue> => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const id = query.id;
  const name = query.name;

  try {
    let response: TeamResponse;

    if (name) {
      response = await $fetch<TeamResponse>('https://v3.football.api-sports.io/teams?name=' + name, {
        method: 'GET',
        headers: {
          'x-apisports-key': config.apiSportsKey,
        },
      });
    }
    else {
      response = await $fetch<TeamResponse>('https://v3.football.api-sports.io/teams?id=' + id, {
        method: 'GET',
        headers: {
          'x-apisports-key': config.apiSportsKey,
        },
      });
    }

    const response2 = await $fetch<PlayerResponse>('https://v3.football.api-sports.io//players?team=' + id + '&season=2024', {
      method: 'GET',
      headers: {
        'x-apisports-key': config.apiSportsKey,
      },
    });

    if (response.response.length > 0) {
      const toRet = mapTeamResponseToTeamVenues(response);
      if (toRet[0]) {
        toRet[0].team.player = mapPlayerResponseToPlayer(response2);
        return toRet[0];
      }
    }

    throw createError({
      statusCode: 404,
      statusMessage: 'Équipe non trouvée',
    });
  }
  catch (error) {
    console.error('Erreur lors de la récupération de l\'équipe', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de récupérer l\'équipe',
    });
  }
});
