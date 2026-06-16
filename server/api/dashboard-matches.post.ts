import type { Fixture, FixtureResponse } from '@/models/fixture';
import { mapFixtureResponseToFixtures } from '@/utils/mappers/fixture.mapper';

/**
 * Récupère les 5 derniers matchs de chaque équipe passée en paramètre.
 * Utilisé par le dashboard pour afficher les matchs des équipes favorites.
 */
export default defineEventHandler(async (event): Promise<{ team: number; matches: Fixture[] }[]> => {
  await requireUserSession(event);
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const toRet: { team: number; matches: Fixture[] }[] = [];

  try {
    for (let i = 0; i < body.teams.length; i++) {
      const response = await $fetch<FixtureResponse>('https://v3.football.api-sports.io/fixtures?team=' + body.teams[i] + '&season=2024', {
        method: 'GET',
        headers: {
          'x-apisports-key': config.apiSportsKey,
        },
      });
      toRet.push({ team: body.teams[i], matches: mapFixtureResponseToFixtures(response).slice(-5) });
    }
    return toRet;
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de récupérer les matchs',
    });
  }
});