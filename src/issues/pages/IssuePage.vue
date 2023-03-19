<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id = '' } = route.params;
const { isLoading, data, issueCommentsQuery } = useIssue(+id);
</script>

<template>
  <router-link class="text-white" :to="{ name: 'issue-list' }"
    >Go Back</router-link
  >

  <loader-spinner
    v-if="isLoading"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />
  <issue-card v-else-if="data" :issue="data" />
  <p v-else>Issue with id:{{ id }} not found</p>

  <loader-spinner
    v-if="issueCommentsQuery.isLoading.value"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />
  <div v-else-if="issueCommentsQuery.data.value" class="column">
    <span class="text-h3 q-mb-md"
      >Comments ({{ issueCommentsQuery.data.value.length }})</span
    >
    <issue-card
      v-for="comment of issueCommentsQuery.data.value"
      :key="comment.id"
      :issue="comment"
    />
  </div>
</template>

<style scoped>
</style>