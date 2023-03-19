import { storeToRefs } from 'pinia';
import { useIssuesStore } from './../store/index';

const useStore = () => {
  const store = useIssuesStore();
  const { labels, state } = storeToRefs(store);

  return {
    labels,
    state,
  };
};

export default useStore;
