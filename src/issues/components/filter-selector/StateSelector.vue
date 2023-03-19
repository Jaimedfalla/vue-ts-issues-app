<script setup lang="ts">
import { useIssuesStore } from 'src/issues/store';

const store = useIssuesStore();
</script>

<template>
  <q-btn-toggle
    v-model="store.state"
    toggle-color="primary"
    push
    spread
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  ></q-btn-toggle>
</template>

<style scoped>
</style>