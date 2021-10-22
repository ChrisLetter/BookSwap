import { BASE_URL, SERVER_PORT } from '@env';

const apiService = {};

apiService.register = (user) => {
  console.log('registeringAPi');
  console.log(SERVER_PORT);
  console.log(BASE_URL);
  console.log(user);
  return fetch(`${BASE_URL}:${SERVER_PORT}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.login = (user) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export default apiService;
