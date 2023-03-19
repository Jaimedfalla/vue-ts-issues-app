<script setup lang="ts">
import { Issue } from 'src/issues/interfaces/Issue';
import IssueCard from './IssueCard.vue';

interface Props {
  issues: Issue[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="row">
    <issue-card v-for="issue of props.issues" :key="issue.id" :issue="issue" />
  </div>
</template>

<style scoped>
</style>