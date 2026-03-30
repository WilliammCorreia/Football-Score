interface LeagueResponse {
  response: Array<{
    league: {
      id: number;
      name: string;
    };
  }>;
}

export default defineEventHandler(async (): Promise<LeagueResponse> => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<LeagueResponse>('https://v3.football.api-sports.io/leagues', {
      method: 'GET',
      headers: {
        'x-apisports-key': config.apiSportsKey,
      },
    });

    return response;
  }
  catch (error) {
    console.error('Erreur lors de la récupération des leagues', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de récupérer les leagues',
    });
  }
});
