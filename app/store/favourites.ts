import {defineStore} from 'pinia'
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
    
    function isInFavourites(toCheck: Team): boolean{
        for(let i = 0; i < teams.value.length; i++){
            if(teams.value[i]?.id === toCheck.id){
                
                return true;    
            }
        }
        return false;
    }
return {teams, addTeam, isInFavourites}
})