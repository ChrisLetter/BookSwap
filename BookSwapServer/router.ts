import express from 'express';
import auth from './controllers/auth';
import books from './controllers/books';
import isbn from './controllers/isbn'
import requests from './controllers/requests';
import messages from './controllers/messages';

const router = express.Router();

// Auth
router.post('/register', auth.create);
router.post('/login', auth.login);
router.get('/username/:userId', auth.getUsername);

// Books
router.get('/books/:userId/:source', books.getAllBooks);
router.post('/books/:userId/:source', books.addOneBook);
router.delete('/books/:userId/:ISBN/:source', books.removeOneBook);

// ISBN
router.post('/isbn/:userId/:ISBN/:source', isbn.addUserToTheIsbnList);
router.delete('/isbn/:userId/:ISBN/:source', isbn.removeUserFromTheIsbnList);
router.get('/isbn/:ISBN', isbn.getAllUsersOfISBN);

// Requests
router.get('/requests/:userId', requests.getRequests);
router.post('/requests/:userId', requests.addOneRequest);
router.put(
  '/requests/:idUser/:idOtherUser/:receiverOrSender/:trueOrFalse',
  requests.changeViewedPropertyOfRequest,
);
router.delete(
  '/requests/:idUser/:idOtherUser/:receiverOrSender',
  requests.deleteRequest,
);
router.put(
  '/requests/:idUser/:idOtherUser/:status/:receiverOrSender/status',
  requests.changeStatusRequest,
);

// Messages
router.get('/messages/:idUser', messages.getAllMessages);
router.post(
  '/messages/:idUser/:idOtherUser/:otherUsername?',
  messages.addMessage,
);
router.put(
  '/messages/:idUser/:idOtherUser/:trueOrFalse/notification',
  messages.toggleNotificationChat,
);

export default router;
