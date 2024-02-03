import axios from 'axios';
import useSWR from 'swr';

export default function useUser() {
  const { data, error, mutate } = useSWR(
    '/ajax/auth/user',
    (...args) => axios.get(...args).then((res) => res.data),
    { shouldRetryOnError: false },
  );

  return {
    ...data,
    error: error?.toJSON().status ? error : null,
    loading: !data && !error,
    mutate,
  };
}
