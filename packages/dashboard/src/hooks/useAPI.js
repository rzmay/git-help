import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useAccount from './useAccount';

export default function useAPI(endpoint, query = {}, options = {}) {
  const { data: account } = useAccount();
  const [results, setResults] = useState(null);
  const { data, error, mutate } = useSWR(account && [`/api${endpoint}`, account.id, JSON.stringify(query)], options);

  useEffect(() => {
    if (data) setResults(data);
  }, [data]);

  return {
    ...results,
    error,
    loading: !results && !error,
    mutate,
  };
}
