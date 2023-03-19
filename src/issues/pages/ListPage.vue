<script setup lang="ts">
import { ref } from 'vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';
import FloatingButtons from '../components/FloatingButtons.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import useLabels from '../composables/useLabels';

const { isLoading, data } = useIssues();
const { data: labels } = useLabels();

const isOpen = ref<boolean>(false);

const openDialog = () => {
  isOpen.value = true;
};
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">GitHub Issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <filter-selector></filter-selector>
    </div>
    <div class="col-xs-12 col-md-8">
      <loader-spinner v-if="isLoading" color="white" />
      <issue-list v-else :issues="data ?? []" />
    </div>
  </div>

  <!-- FloatingButtons -->
  <floating-buttons
    :buttons="[
      {
        icon: 'add',
        color: 'primary',
        size: 'lg',
        action: openDialog,
      },
    ]"
  />

  <new-issue-dialog
    v-if="labels"
    :is-open="isOpen"
    :labels="labels.map((label) => label.name) || []"
    @on-close="isOpen = false"
  />
</template>

<style scoped>
</style>