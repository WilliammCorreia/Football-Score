<script setup lang="ts">
const { user, clear: clearSession, loggedIn } = useUserSession();
const route = useRoute();

const emit = defineEmits<{
  'navigate': []
}>();

async function logout() {
  await clearSession();
  await navigateTo('/login');
}

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

const mainNav: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { to: '/', label: 'Matchs du jour', icon: 'lucide:trophy' },
  { to: '/search', label: 'Recherche', icon: 'lucide:search' },
];

const accountNav: NavItem[] = [
  { to: '/premium', label: 'Premium', icon: 'lucide:star' },
  { to: '/profil', label: 'Mon profil', icon: 'lucide:user' },
];

const guestNav: NavItem[] = [
  { to: '/login', label: 'Se connecter', icon: 'lucide:log-in' },
  { to: '/register', label: 'Créer un compte', icon: 'lucide:user-plus' },
];

function isActive(to: string): boolean {
  if (to === '/') return route.path === '/';
  return route.path === to || route.path.startsWith(to + '/');
}

function handleNavigate() {
  emit('navigate');
}
</script>

<template>
  <nav class="flex h-full flex-col overflow-y-auto">
    <!-- Section principale -->
    <div v-if="loggedIn" class="flex-1 px-3 py-6">
      <p class="eyebrow mb-3 px-3">Navigation</p>
      <ul class="space-y-1">
        <li v-for="item in mainNav" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-snappy"
            :class="isActive(item.to)
              ? 'bg-primary-50 text-primary-700'
              : 'text-text-muted hover:bg-surface-muted hover:text-text-main'"
            @click="handleNavigate"
          >
            <Icon
              :name="item.icon"
              size="1.25rem"
              :class="isActive(item.to) ? 'text-primary-600' : ''"
            />
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <p class="eyebrow mb-3 mt-8 px-3">Compte</p>
      <ul class="space-y-1">
        <li v-for="item in accountNav" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-snappy"
            :class="isActive(item.to)
              ? 'bg-primary-50 text-primary-700'
              : 'text-text-muted hover:bg-surface-muted hover:text-text-main'"
            @click="handleNavigate"
          >
            <Icon
              :name="item.icon"
              size="1.25rem"
              :class="isActive(item.to) ? 'text-primary-600' : ''"
            />
            {{ item.label }}
            <span
              v-if="item.to === '/premium'"
              class="ml-auto rounded-md bg-accent-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-600"
            >
              Pro
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Section invité (non connecté) -->
    <div v-else class="flex-1 px-3 py-6">
      <p class="eyebrow mb-3 px-3">Bienvenue</p>
      <ul class="space-y-1">
        <li v-for="item in guestNav" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-snappy"
            :class="isActive(item.to)
              ? 'bg-primary-50 text-primary-700'
              : 'text-text-muted hover:bg-surface-muted hover:text-text-main'"
            @click="handleNavigate"
          >
            <Icon :name="item.icon" size="1.25rem" />
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Footer : user info + logout -->
    <div
      v-if="loggedIn && user"
      class="border-t border-border p-3"
    >
      <div class="flex items-center gap-3 rounded-lg px-2 py-2">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="size-9 rounded-full border border-border object-cover"
        >
        <div v-else class="flex size-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
          {{ user.name?.charAt(0).toUpperCase() }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-text-main">
            {{ user.name }}
          </p>
          <p class="truncate text-xs text-text-soft">
            {{ user.email }}
          </p>
        </div>
      </div>

      <button
        class="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-muted transition-colors duration-150 hover:bg-danger-bg hover:text-danger"
        @click="logout"
      >
        <Icon name="lucide:log-out" size="1.25rem" />
        Déconnexion
      </button>
    </div>
  </nav>
</template>