<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from 'src/issues/composables/useLabels';

const { isLoading, data, toggleLabel, labels } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner
      v-if="isLoading"
      size="50px"
      :thickness="1"
      :show-text="false"
    />

    <q-chip
      v-else
      v-for="label of data"
      :key="label.id"
      :style="{ color: `#${label.color}` }"
      @click="toggleLabel(label.name)"
      :outline="!labels.includes(label.name)"
      clickable
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped>
</style>