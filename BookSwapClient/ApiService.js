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
    .catch((err) => console.log('register', err));
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
    .catch((err) => console.log('login', err));
};

apiService.getUserLibraryBooks = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/books/${userId}/library`)
    .then((res) => res.json())
    .catch((err) => console.log('getUserLibraryBooks', err));
};

apiService.removeBookFromLibrary = (userId, isbn) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/books/${userId}/${isbn}/library`, {
    method: 'DELETE',
  }).catch((err) => console.log('removeBookFromLibrary', err));
};

apiService.removeBookFromISBNList = (userId, isbn) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/isbn/${userId}/${isbn}/sell`, {
    method: 'DELETE',
  }).catch((err) => console.log('removeBookFromISBNList', err));
};

// used for searching books scanning the ISBN code
apiService.searchBooksByIsbnGoogle = (ISBN, key) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}&key=${key}`,
  )
    .then((data) => data.json())
    .catch((err) => console.log('searchBooksByIsbnGoogle', err));
};

// used for searching books filling the form
apiService.searchBooksByFormGoogle = (url, key) => {
  return fetch(`${url}&key=${key}`)
    .then((data) => data.json())
    .catch((err) => console.log('searchBooksByFormGoogle', err));
};

// used for saving books both in the library and in the wish list,
// specify library or wish list in the location parameter.
apiService.addBook = (userId, location, bookInfos) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/books/${userId}/${location}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookInfos),
  }).catch((err) => console.log('addBook', err));
};

// used for saving books in the ISBN list, specify buy or sell in the
// location parameter, based on the list that you want to target.
apiService.addBookToISBNList = (userId, isbn, location) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/isbn/${userId}/${isbn}/${location}`,
    {
      method: 'POST',
    },
  ).catch((err) => console.log('addBookToISBNList', err));
};

export default apiService;
