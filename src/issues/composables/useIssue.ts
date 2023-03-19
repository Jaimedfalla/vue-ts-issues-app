import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { githubApi } from './../api/GithubApi';
import { Issue } from '../interfaces/Issue';

const getIssue = async (idIssue: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${idIssue}`);

  return data;
};

const getIssueComments = async (idIssue: number): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>(`/issues/${idIssue}/comments`);

  return data;
};

interface Options {
  autoload?: boolean;
}

const useIssue = (issue: number, options?: Options) => {
  const { autoload = true } = options || {};
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(
    ['issue', issue],
    () => getIssue(issue),
    {
      staleTime: 1000 * 60,
      enabled: autoload,
    }
  );

  const issueCommentsQuery = useQuery(
    ['issue', issue, 'comments'],
    () => getIssueComments(issue),
    {
      staleTime: 1000 * 15,
      enabled: autoload,
    }
  );

  //This method is to anticipate a user request and save data in cache before request is launched
  const prefetchIssue = (idIssue: number) => {
    queryClient.prefetchQuery(['issue', idIssue], () => getIssue(idIssue), {
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery(
      ['issue', idIssue, 'comments'],
      () => getIssueComments(idIssue),
      {
        staleTime: 1000 * 15,
      }
    );
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return {
    isLoading,
    data,
    issueCommentsQuery,
    prefetchIssue,
    setIssueCacheData,
  };
};

export default useIssue;
