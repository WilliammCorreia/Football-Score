import { defineStore } from 'pinia'
import { useFavouritesStore } from '~/store/favourites'
import type { Team } from '~/models/team'

export const useUserStore = defineStore('user', {
    state: () => ({
        pseudo: null as string | null,
        preferredLeague: null as string | null,
    }),

    actions: {
        updateProfile(pseudo: string, league: string) {
            this.pseudo = pseudo
            this.preferredLeague = league
        },


        getFavouriteTeamsIds() {
            const fav = useFavouritesStore()
            return fav.listIds()
        },

        toggleFavouriteTeam(team: Team) {
            const fav = useFavouritesStore()
            fav.addTeam(team)
        },

        isTeamFavourite(team: Team) {
            const fav = useFavouritesStore()
            return fav.isInFavourites(team)
        },

        getFavouriteTeam(id: number) {
            const fav = useFavouritesStore()
            return fav.getTeam(id)
        }
    }
})