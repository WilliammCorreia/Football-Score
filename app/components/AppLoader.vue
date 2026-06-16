<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16">
    <div class="relative size-12">
      <!-- Track gris -->
      <div class="absolute inset-0 rounded-full border-4 border-surface-muted" />
      <!-- Arc qui tourne -->
      <div class="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary-500" />
    </div>
    <p class="font-mono tabular text-xs uppercase tracking-eyebrow text-text-soft">
      {{ label || 'Chargement…' }}
    </p>
  </div>
</template>