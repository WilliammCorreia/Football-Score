import type { Player } from "./player";

export interface Team {
    id: number, 
    name: string, 
    country: string,
    founded: number,
    code: string,
    logo: string,
    player: Player[]
}

interface TeamVenue {
    team: Team
}

export interface TeamResponse {
    response: Array<TeamVenue>;
}