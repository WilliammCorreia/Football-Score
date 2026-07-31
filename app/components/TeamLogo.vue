<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg' | 'xl'
  },
});

const sizeClasses: Record<string, string> = {
  sm: 'size-8',
  md: 'size-12 md:size-16',
  lg: 'size-20 md:size-24',
  xl: 'size-28 md:size-36',
};
</script>

<template>
  <img
    :src="url"
    :alt="`Logo de ${name || 'l\'équipe'}`"
    :class="[sizeClasses[size], 'object-contain']"
  >
</template>
