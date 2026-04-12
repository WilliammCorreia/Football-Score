import type { Team, TeamResponse } from '@/models/team';
import type { Player, PlayerResponse } from '@/models/player';
import { mapTeamResponseToTeams } from '@/utils/mappers/team.mapper';
import { mapPlayerResponseToPlayer } from '@/utils/mappers/player.mapper';

export default defineEventHandler(async (): Promise<Team> => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<TeamResponse>(`https://v3.football.api-sports.io/teams?id=33`, {
      method: 'GET',
      headers: {
        'x-apisports-key': config.apiSportsKey,
      },
    });
    console.log(response)
    const response2 = await $fetch<PlayerResponse>(`https://v3.football.api-sports.io//players?team=33&season=2024`, {
      method: 'GET',
      headers: {
        'x-apisports-key': config.apiSportsKey,
      },
    });
    if(response.response.length > 0){
        const toRet = mapTeamResponseToTeams(response);    
        if(toRet[0]){
          toRet[0].player = mapPlayerResponseToPlayer(response2)
          return toRet[0]
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
