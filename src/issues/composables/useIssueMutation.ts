import { githubApi } from './../api/GithubApi';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/Issue';

interface Args {
  title: string;
  body: string;
  labels: string[];
}
const addIssue = async ({
  title,
  body = '',
  labels = [],
}: Args): Promise<Issue> => {
  const newIssue = {
    title,
    body,
    labels,
  };
  const { data } = await githubApi.post<Issue>('/issues', newIssue);
  return data;
};
const useIssueMutation = () => {
  const queryClient = useQueryClient();

  const issueMutation = useMutation(addIssue, {
    onSuccess: (issue) => {
      //Se recomienda que cuando se escriben datos en backend se actualice toda la data que están en caché
      queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.refetchQueries(['issues'], {
        exact: false,
      });

      queryClient.setQueryData(['issue', issue.number], issue);
    },
  });

  return {
    issueMutation,
  };
};

export default useIssueMutation;
