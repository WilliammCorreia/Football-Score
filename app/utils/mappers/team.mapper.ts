import type { Team, TeamResponse } from '@/models/team';

export function mapTeamResponseToTeams(response: TeamResponse): Team[] {    
    return response.response.map(item => ({
        id: item.team.id, 
        name: item.team.name, 
        country: item.team.country,
        founded: item.team.founded,
        code: item.team.code,
        logo: item.team.logo,
        player: []
    }))    
}
