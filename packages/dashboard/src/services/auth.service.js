import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const login = function login(data) {
  return axios.post('/ajax/auth/login/email', data)
    .then((response) => response.data);
};
