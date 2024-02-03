import React from 'react';
import useSWR from 'swr';
import useAccount from './useAccount';

export default function useAJAX(endpoint, query = {}, options = {}) {
  const { data: account } = useAccount();
  const [results, setResults] = React.useState(undefined);
  const { data, error, mutate } = useSWR(account && endpoint && [endpoint, account.id, JSON.stringify(query)], options);

  React.useEffect(() => {
    if (data !== undefined) setResults(data);
  }, [data]);

  return {
    ...results,
    error,
    loading: results === undefined && !error,
    mutate,
  };
}
