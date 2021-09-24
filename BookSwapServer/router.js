const router = require('express').Router();
const auth = require('./controllers/auth');
const books = require('./controllers/books');
const isbn = require('./controllers/isbn');

router.post('/register', auth.create);
router.post('/login', auth.login);

router.get('/books/:userId/:source', books.getAllBooks);
router.post('/books/:userId/:source', books.addOneBook);
router.delete('/books/:userId/:ISBN/:source', books.removeOneBook);

router.post('/isbn/:userId/:ISBN/:source', isbn.addUserToTheIsbnList);
router.delete('/isbn/:userId/:ISBN/:source', isbn.removeUserFromTheIsbnList);

module.exports = router;
