import { BASE_URL, SERVER_PORT } from '@env';

const apiService = {};

apiService.register = (user) => {
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

apiService.getUserLibraryBooks = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/books/${userId}/library`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.removeBookFromLibrary = (userId, isbn) => {
  fetch(`${BASE_URL}:${SERVER_PORT}/books/${userId}/${isbn}/library`, {
    method: 'DELETE',
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
};

apiService.removeBookFromISBNList = (userId, isbn) => {
  fetch(`${BASE_URL}:${SERVER_PORT}/isbn/${userId}/${isbn}/sell`, {
    method: 'DELETE',
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
};

export default apiService;
