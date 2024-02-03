import React from 'react';
import useSWR from 'swr';
import DashboardContext from '../context/DashboardContext';

export default function useAccount() {
  const { account } = React.useContext(DashboardContext);
  const { data, error, mutate } = useSWR(account && ['/ajax/account', account]);

  return {
    data,
    error,
    loading: !data && !error,
    mutate,
  };
}
