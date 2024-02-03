import axios from 'axios';
import React from 'react';
import { SWRConfig } from 'swr';
import Layout from '../components/Layout';
import './global.css';
import DashboardContext from '../context/DashboardContext';

export default function App({ Component, pageProps }) {
  const [account, setAccount] = React.useState(null);

  const dashboardContext = React.useMemo(() => ({
    account,
    setAccount,
  }), [account]);

  React.useEffect(() => {
    setAccount(localStorage.getItem('account'));
  });

  return (
    <DashboardContext.Provider value={dashboardContext}>
      <SWRConfig value={{
        fetcher: (url, account, query) => {
          return axios.get(url, {
            headers: { 'GitHelp-Account': account },
            params: query && JSON.parse(query),
          }).then((res) => res.data);
        },
      }}
      >
        <Layout>
            <Component {...pageProps} />
         </Layout>
      </SWRConfig>
    </DashboardContext.Provider>
  );
}
