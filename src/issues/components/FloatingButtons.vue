<script setup lang="ts">
import { Button } from '../interfaces/Button';

interface Props {
  buttons: Button[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="fab">
    <q-btn
      v-for="button of props.buttons"
      :key="button.icon"
      round
      :color="button.color || 'primary'"
      :icon="button.icon"
      :size="button.size || 'md'"
      @click="button.action"
    />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>