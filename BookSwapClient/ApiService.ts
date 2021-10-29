import { BASE_URL, SERVER_PORT } from '@env';
import { IRegisterUser, ILoginrUser } from './interfaces/interfaces';
const apiService: { [key: string]: any } = {};

apiService.register = (user: IRegisterUser) => {
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

apiService.login = (user: ILoginrUser) => {
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

// used for getting books both from the library and from the wish list,
// specify "library" or "wishList" in the location parameter (or "all" to get all of them).
apiService.getUserBooks = (userId: string, location: string) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/books/${userId}/${location}`)
    .then((res) => res.json())
    .catch((err) => console.log('getUserLibraryBooks', err));
};

// used for removing books both from the library and from the wish list,
// specify "library" or "wishList" in the location parameter.
apiService.removeUserBook = (
  userId: string,
  isbn: string,
  location: string,
) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/books/${userId}/${isbn}/${location}`,
    {
      method: 'DELETE',
    },
  ).catch((err) => console.log('removeBookFromLibrary', err));
};

// used for removing books from the ISBN list, specify buy or sell in the
// location parameter, based on the list that you want to target.
apiService.removeBookFromISBNList = (
  userId: string,
  isbn: string,
  location: string,
) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/isbn/${userId}/${isbn}/${location}`,
    {
      method: 'DELETE',
    },
  ).catch((err) => console.log('removeBookFromISBNList', err));
};

// used for searching books scanning the ISBN code
apiService.searchBooksByIsbnGoogle = (ISBN: string, key: string) => {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}&key=${key}`,
  )
    .then((data) => data.json())
    .catch((err) => console.log('searchBooksByIsbnGoogle', err));
};

// used for searching books filling the form
apiService.searchBooksByFormGoogle = (url: string, key: string) => {
  return fetch(`${url}&key=${key}`)
    .then((data) => data.json())
    .catch((err) => console.log('searchBooksByFormGoogle', err));
};

// used for saving books both in the library and in the wish list,
// specify "library" or "wishList" in the location parameter.
apiService.addBook = (userId: string, location: string, bookInfos) => {
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

apiService.getUsersFromISBNList = (isbn) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/isbn/${isbn}`)
    .then((data) => data.json())
    .catch((err) => console.log('getUsersFromISBNList', err));
};

apiService.getBestMatches = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/bestMatches/${userId}`)
    .then((data) => data.json())
    .catch((err) => console.log('getBestMatches', err));
};

apiService.getUsername = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/username/${userId}`)
    .then((data) => data.json())
    .catch((err) => console.log('getUsername', err));
};

apiService.sendRequest = (userId, requestInfos) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/requests/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestInfos),
  }).catch((err) => console.log('sendRequest', err));
};

apiService.getRequests = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/requests/${userId}`)
    .then((data) => data.json())
    .catch((err) => console.log('getRequests', err));
};

apiService.removeNotificationBadgeReceiver = (req) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/requests/${req.userTo}/${req.userFrom}/receiver/true`,
    {
      method: 'PUT',
    },
  ).catch((err) => console.log('removeNotificationBadgeReceiver', err));
};

apiService.removeNotificationBadgeSender = (req, boolean) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/requests/${req.userFrom}/${req.userTo}/sender/${boolean}`,
    {
      method: 'PUT',
    },
  ).catch((err) => console.log('removeNotificationBadgeSender', err));
};

apiService.deleteRequest = (request) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/requests/${request.userTo}/${request.userFrom}/receiver`,
    {
      method: 'DELETE',
    },
  ).catch((err) => console.log('deleteRequest', err));
};

apiService.changeStatusRequestSender = (request, status) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/requests/${request.userFrom}/${request.userTo}/${status}/sender/status`,
    {
      method: 'PUT',
    },
  ).catch((err) => console.log('changeStatusRequest', err));
};

apiService.changeStatusRequestReceiver = (request, status) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/requests/${request.userTo}/${request.userFrom}/${status}/receiver/status`,
    {
      method: 'PUT',
    },
  ).catch((err) => console.log('changeStatusRequestReceiver', err));
};

apiService.sendStartingMessageSender = (request, userId, message) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/messages/${request.userFrom}/${userId}/${request.userToUsername}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    },
  ).catch((err) => console.log('sendStartingMessageSender', err));
};

apiService.sendStartingMessageReceiver = (request, userId, message) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/messages/${userId}/${request.userFrom}/${request.userToUsername}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    },
  ).catch((err) => console.log('sendStartingMessageReceiver', err));
};

apiService.toggleNotificationMessage = (idUserFrom, idUserTo, direction) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/messages/${idUserFrom}/${idUserTo}/${direction}/notification`,
    {
      method: 'PUT',
    },
  ).catch((err) => console.log('toggleNotificationMessage', err));
};

apiService.deleteRequestSender = (request) => {
  return fetch(
    `${BASE_URL}:${SERVER_PORT}/requests/${request.userFrom}/${request.userTo}/sender`,
    {
      method: 'DELETE',
    },
  ).catch((err) => console.log('deleteRequestSender', err));
};

apiService.getMessages = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/messages/${userId}`)
    .then((data) => data.json())
    .catch((err) => console.log('getRequests', err));
};

apiService.sendMessage = (userId, otherUser, message) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/messages/${userId}/${otherUser}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).catch((err) => console.log('sendMessage', err));
};

apiService.getNumberOfRequests = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/requests/${userId}`)
    .then((data) => data.json())
    .catch((err) => console.log('getNumberOfRequests', err));
};

apiService.getNumberOfMessages = (userId) => {
  return fetch(`${BASE_URL}:${SERVER_PORT}/messages/${userId}`)
    .then((data) => data.json())
    .catch((err) => console.log('getNumberOfMessages', err));
};

export default apiService;
