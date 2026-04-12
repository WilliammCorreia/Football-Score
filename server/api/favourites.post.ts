import type { Fixture, FixtureResponse } from '@/models/fixture';
import { mapFixtureResponseToFixtures } from '@/utils/mappers/fixture.mapper';
import { todayDate } from '@/utils/date.util';

export default defineEventHandler(async (event): Promise<{team: number, matches: Fixture[]}[]> => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    console.log(body, body.teams.length);
    let toRet: {team: number, matches: Fixture[]}[] = [];
    try {
        for(let i = 0; i < body.teams.length; i++){
            const response = await $fetch<FixtureResponse>('https://v3.football.api-sports.io/fixtures?team='+ body.teams[i] +'&season=2024', {
                method: 'GET',
                headers: {
                    'x-apisports-key': config.apiSportsKey,
                },
            });
            console.log(response);
            toRet.push({team: body.teams[i], matches: mapFixtureResponseToFixtures(response).slice(-5)});
        }
        console.log(toRet);
        return toRet;


    }
    catch (error) {
        console.error('Erreur lors de la récupération des matchs', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Impossible de récupérer les matchs',
        });
    }
});