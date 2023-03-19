import { Label } from './../interfaces/Label';
import { githubApi } from './../api/GithubApi';
import { useQuery } from '@tanstack/vue-query';
import { useIssuesStore } from '../store';
import { storeToRefs } from 'pinia';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100');

  return data;
};

const useLabels = () => {
  const store = useIssuesStore();
  const { labels } = storeToRefs(store);

  const { isLoading, data } = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    data,

    labels,
    toggleLabel: store.toggleLabel,
  };
};

export default useLabels;
