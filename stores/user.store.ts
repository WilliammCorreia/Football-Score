import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        email: '',
        favoriteTeam: ''
    }),

    actions: {
        updateUser(payload: { username: string; email: string; favoriteTeam: string }) {
            this.username = payload.username
            this.email = payload.email
            this.favoriteTeam = payload.favoriteTeam
        }
    }
})
