import { State } from './../interfaces/Issue';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useIssuesStore = defineStore('issues', () => {
  const state = ref<State>(State.All);
  const labels = ref<string[]>([]);

  return {
    state,
    labels,

    toggleLabel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter((label) => label !== labelName);
        return;
      }

      labels.value.push(labelName);
    },
  };
});
