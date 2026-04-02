import type { Fixture, FixtureResponse } from '@/models/fixture';
import { mapFixtureResponseToFixtures } from '@/utils/mappers/fixture.mapper';

export default defineEventHandler(async (): Promise<Fixture[]> => {
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<FixtureResponse>('https://v3.football.api-sports.io/fixtures?date=2026-04-02&timezone=Europe/Paris', {
      method: 'GET',
      headers: {
        'x-apisports-key': config.apiSportsKey,
      },
    });

    return mapFixtureResponseToFixtures(response);
  }
  catch (error) {
    console.error('Erreur lors de la récupération des matchs', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de récupérer les matchs',
    });
  }
});
