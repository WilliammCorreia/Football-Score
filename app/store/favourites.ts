import { defineStore } from 'pinia';
import type { Team } from '~/models/team';

interface FavouriteRow {
  id: number;
  userId: number;
  teamId: number;
  teamName: string;
  teamLogo: string;
  createdAt: string;
}

export const useFavouritesStore = defineStore('favourites', () => {
  // Cache UI local (alimenté depuis la BDD)
  const teams = ref<Team[]>([]);
  const loaded = ref(false);

  /**
   * Charge les favoris depuis la BDD. À appeler au démarrage ou après login.
   * Si l'utilisateur n'est pas connecté, retourne un tableau vide.
   */
  async function fetchFromServer(): Promise<void> {
    try {
      const rows = await $fetch<FavouriteRow[]>('/api/favourites');
      teams.value = rows.map(row => ({
        id: row.teamId,
        name: row.teamName,
        logo: row.teamLogo,
        country: '',
        founded: 0,
        code: '',
        player: [],
      }));
      loaded.value = true;
    }
    catch (error) {
      console.error('Impossible de charger les favoris', error);
      teams.value = [];
    }
  }

  /**
   * Ajoute une équipe aux favoris (BDD + cache local).
   * Si elle est déjà en favori, ne fait rien.
   */
  async function addTeam(toAdd: Team): Promise<void> {
    if (isInFavourites(toAdd)) return;

    try {
      await $fetch('/api/favourites', {
        method: 'POST',
        body: {
          teamId: toAdd.id,
          teamName: toAdd.name,
          teamLogo: toAdd.logo,
        },
      });
      teams.value.push(toAdd);
    }
    catch (error) {
      console.error('Impossible d\'ajouter le favori', error);
    }
  }

  /**
   * Retire une équipe des favoris (BDD + cache local).
   */
  async function removeTeam(toRemove: Team): Promise<void> {
    try {
      await $fetch(`/api/favourites/${toRemove.id}`, { method: 'DELETE' });
      const idx = teams.value.findIndex(t => t.id === toRemove.id);
      if (idx !== -1) teams.value.splice(idx, 1);
    }
    catch (error) {
      console.error('Impossible de retirer le favori', error);
    }
  }

  /**
   * Toggle : ajoute si pas présent, retire si présent.
   * Pratique pour le bouton cœur.
   */
  async function toggleTeam(team: Team): Promise<void> {
    if (isInFavourites(team)) {
      await removeTeam(team);
    }
    else {
      await addTeam(team);
    }
  }

  function listIds(): number[] {
    return teams.value.map(value => value.id);
  }

  function isInFavourites(toCheck: Team): boolean {
    return teams.value.some(value => value.id === toCheck.id);
  }

  function getTeam(id: number): Team {
    const found = teams.value.find(value => value.id === id);
    if (found) return found;
    throw new Error('Équipe non trouvée');
  }

  return {
    teams,
    loaded,
    fetchFromServer,
    addTeam,
    removeTeam,
    toggleTeam,
    listIds,
    isInFavourites,
    getTeam,
  };
});