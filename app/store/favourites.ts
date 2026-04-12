import {defineStore} from 'pinia'
import type { Fixture } from '~/models/fixture';
import type { Team } from '~/models/team'
export const useFavouritesStore = defineStore('favourites', () => {
const teams = ref<Team[]>([]) 
    function addTeam(toAdd: Team): void {
        for(let i = 0; i < teams.value.length; i++){
            if(teams.value[i]?.id === toAdd.id){
                teams.value.splice(i, 1);
                return;    
            }
        }
            teams.value.push(toAdd);
        }
    
    function listIds(): number[]{
        return teams.value.map(value => value.id);
    }

    function isInFavourites(toCheck: Team): boolean{
        for(let i = 0; i < teams.value.length; i++){
            if(teams.value[i]?.id === toCheck.id){
                
                return true;    
            }
        }
        return false;
    }

    function getTeam(id: number): Team {
        if(teams.value.find(value => value.id === id)) return teams.value.find(value => value.id === id)!;
        throw new Error("Équipe non trouvée");
    }

return {teams, addTeam, listIds, isInFavourites, getTeam}
})