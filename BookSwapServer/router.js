const router = require('express').Router();
const auth = require('./controllers/auth');
const books = require('./controllers/books');
const isbn = require('./controllers/isbn');

router.post('/register', auth.create);
router.post('/login', auth.login);

router.get('/books/:userId', books.getAllBooks);
router.post('/books/:userId/library', books.addBookToLibrary);

router.post('/isbn/:userId/:ISBN/sell', isbn.addUserToTheSellingList);

module.exports = router;
