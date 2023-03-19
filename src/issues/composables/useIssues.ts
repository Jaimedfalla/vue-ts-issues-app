import { Issue } from './../interfaces/Issue';
import { githubApi } from './../api/GithubApi';
import { useQuery } from '@tanstack/vue-query';
import useStore from './useStore';

const getIssues = async (labels: string[], state: string): Promise<Issue[]> => {
  const params = new URLSearchParams();
  params.append('per_page', '10');

  if (state) params.append('state', state);
  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  const { data } = await githubApi.get<Issue[]>('/issues', {
    params,
  });

  return data;
};

const useIssues = () => {
  const { labels, state } = useStore();

  const { isLoading, data } = useQuery(['issues', { labels, state }], () =>
    getIssues(labels.value, state.value)
  );

  return {
    isLoading,
    data,
  };
};

export default useIssues;
