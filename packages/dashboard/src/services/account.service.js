import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const createAccount = function createAccount(data) {
  return axios.post('/ajax/accounts', data)
    .then((response) => response.data);
};
