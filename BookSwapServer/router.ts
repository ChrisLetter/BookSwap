const router = require('express').Router();
const auth = require('./controllers/auth');
const books = require('./controllers/books');
const isbn = require('./controllers/isbn');
const requests = require('./controllers/requests');
const messages = require('./controllers/messages');

router.post('/register', auth.create);
router.post('/login', auth.login);
router.get('/username/:userId', auth.getUsername);

router.get('/books/:userId/:source', books.getAllBooks);
router.post('/books/:userId/:source', books.addOneBook);
router.delete('/books/:userId/:ISBN/:source', books.removeOneBook);
router.get('/bestMatches/:userId', books.getBestMatches);

router.post('/isbn/:userId/:ISBN/:source', isbn.addUserToTheIsbnList);
router.delete('/isbn/:userId/:ISBN/:source', isbn.removeUserFromTheIsbnList);
router.get('/isbn/:ISBN', isbn.getAllUsersOfISBN);

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

router.get('/messages/:idUser', messages.getAllMessages);
router.post(
  '/messages/:idUser/:idOtherUser/:otherUsername?',
  messages.addMessage,
);
router.put(
  '/messages/:idUser/:idOtherUser/:trueOrFalse/notification',
  messages.toggleNotificationChat,
);

export = router;
