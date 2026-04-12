import type { Player, PlayerResponse } from '@/models/player';

export function mapPlayerResponseToPlayer(response: PlayerResponse): Player[] {    
    return response.response.map(item => ({
        id: item.player.id, 
        name: item.player.name,
        firstname: item.player.firstname,
        lastname: item.player.lastname,
        age: item.player.age,
        nationality: item.player.nationality,
        height: item.player.height,
        weight: item.player.weight,
        injured: item.player.injured,
        photo: item.player.photo
    }))    
}


/**{ id: 74,
  name: 'S. Amrabat',
  firstname: 'Sofyan',
  lastname: 'Amrabat',
  age: 29,
  birth: { date: '1996-08-21', place: 'Huizen', country: 'Netherlands' },
  nationality: 'Morocco',
  height: '183',
  weight: '82',
  injured: false,
  photo: 'https://media.api-sports.io/football/players/74.png' }
 */