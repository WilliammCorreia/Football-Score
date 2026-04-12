<script setup lang="ts">
/**
 * Aucune logique ici.
 * La page Settings doit uniquement afficher la mise en page + ProfileForm.
 */
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <!-- Conteneur principal -->
    <div class="max-w-3xl mx-auto">

      <!-- Header de la page -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p class="text-gray-600 mt-1">
          Gérez votre profil et vos préférences.
        </p>
      </div>

      <!-- Carte contenant le formulaire -->
      <div class="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">
          Informations du profil
        </h2>

        <ProfileForm />

      </div>

    </div>
  </div>
</template>

