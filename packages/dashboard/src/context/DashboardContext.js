import { createContext } from 'react';

const DashboardContext = createContext({
  account: null,
  setAccount: null,
});

export default DashboardContext;
