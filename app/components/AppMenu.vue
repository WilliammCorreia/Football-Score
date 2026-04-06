<template>
  <nav class="size-full bg-white">
    <ul class="px-4 py-8 md:px-7 md:py-10">
      <li class="mb-2 flex flex-row items-center gap-2 rounded-xl p-3 text-xl font-semibold hover:bg-gray-100 hover:text-gray-500 active:bg-gray-200 active:text-black md:mb-4">
        <Icon
          name="ion:ios-home-outline"
          size="2rem"
          mode="svg"
        />
        <NuxtLink to="/dashboard">Vue d'ensemble</NuxtLink>
      </li>
      <li class="my-2 flex flex-row items-center gap-2 rounded-xl p-3 text-xl font-semibold hover:bg-gray-100 hover:text-gray-500 active:bg-gray-200 active:text-black">
        <Icon
          name="ion:ios-football"
          size="2rem"
          mode="svg"
        />
        <NuxtLink to="/">Matchs</NuxtLink>
      </li>
      <li class="my-2 flex flex-row items-center gap-2 rounded-xl p-3 text-xl font-semibold hover:bg-gray-100 hover:text-gray-500 active:bg-gray-200 active:text-black">
        <Icon
          name="ion:ios-search-strong"
          size="2rem"
          mode="svg"
        />
        <NuxtLink to="/search">Recherche</NuxtLink>
      </li>
      <li class="my-2 flex flex-row items-center gap-2 rounded-xl p-3 text-xl font-semibold hover:bg-gray-100 hover:text-gray-500 active:bg-gray-200 active:text-black">
        <Icon
          name="ion:ios-settings"
          size="2rem"
          mode="svg"
        />
        <NuxtLink to="/settings">Paramètres</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
