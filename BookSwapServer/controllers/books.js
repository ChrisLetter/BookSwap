const User = require('../models/users');
const ISBNdb = require('../models/isbn');

async function getAllBooks(req, res) {
  const { userId, source } = req.params;
  try {
    const books = await User.findOne({ _id: userId });
    const booksToSell = books.booksToSell;
    const booksToBuy = books.booksToBuy;
    res.status(200);
    if (source === 'library') {
      res.send(booksToSell);
    } else if (source === 'wishList') {
      res.send(booksToBuy);
    } else if (source === 'all') {
      res.send({ booksToBuy, booksToSell });
    }
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

async function getBestMatches(req, res) {
  try {
    const { userId } = req.params;
    const allBooks = await User.findOne({ _id: userId });
    const ISBNbooksToSell = allBooks.booksToSell.map((book) => book.ISBN);
    const ISBNbooksToBuy = allBooks.booksToBuy.map((book) => book.ISBN);
    const matches = [];

    for (let isbnCode of ISBNbooksToSell) {
      const usersList = await ISBNdb.findOne({ ISBN: isbnCode });
      matches.push(...usersList.UsersThatWantIt);
    }
    for (let isbnCode of ISBNbooksToBuy) {
      const usersList = await ISBNdb.findOne({ ISBN: isbnCode });
      matches.push(...usersList.UsersThatWantToSellIt);
    }
    const freq = {};
    for (let el of matches) {
      if (Object.keys(freq).includes(el)) {
        freq[el] += 1;
      } else {
        freq[el] = 1;
      }
    }
    const sorted = Object.entries(freq).sort(([, a], [, b]) => b - a);
    for (let el of sorted) {
      const { username } = await User.findOne({ _id: el[0] });
      el.push(username);
    }
    res.status(201).send({ sorted });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = { getAllBooks, addOneBook, removeOneBook, getBestMatches };
