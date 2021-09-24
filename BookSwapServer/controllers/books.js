const User = require('../models/users.js');

async function getAllBooks(req, res) {
  const { userId, source } = req.params;
  try {
    const books = await User.findOne({ _id: userId });
    const booksToSell = books.booksToSell;
    const booksToBuy = books.booksToBuy;
    res.status(200);
    source === 'library' ? res.send(booksToSell) : res.send(booksToBuy);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function addOneBook(req, res) {
  const { userId, source } = req.params;
  const bookToInsert = req.body;
  try {
    source === 'library'
      ? User.findOneAndUpdate(
          { _id: userId },
          { $push: { booksToSell: bookToInsert } },
          { upsert: true },
        ).then(() => {})
      : User.findOneAndUpdate(
          { _id: userId },
          { $push: { booksToBuy: bookToInsert } },
          { upsert: true },
        ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function removeOneBook(req, res) {
  const { userId, ISBN, source } = req.params;
  try {
    // TODO: refactor so that it updates without doing a double operation
    const dbBooks = await User.findOne({ _id: userId });
    source === 'library'
      ? User.findOneAndUpdate(
          { _id: userId },
          {
            booksToSell: dbBooks.booksToSell.filter(
              (books) => books.ISBN !== ISBN,
            ),
          },
        ).then(() => {})
      : User.findOneAndUpdate(
          { _id: userId },
          {
            booksToBuy: dbBooks.booksToBuy.filter(
              (books) => books.ISBN !== ISBN,
            ),
          },
        ).then(() => {});
    // TODO: set the right status
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = { getAllBooks, addOneBook, removeOneBook };
