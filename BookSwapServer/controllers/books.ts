import { Request, Response } from 'express';
import User = require('../models/users');
import ISBNdb = require('../models/isbn');
import { IIsbn, IBook } from './../interfaces/interfaces';

async function getAllBooks(req: Request, res: Response) {
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

async function addOneBook(req: Request, res: Response) {
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

async function removeOneBook(req: Request, res: Response) {
  const { userId, ISBN, source } = req.params;
  try {
    // TODO: refactor so that it updates without doing a double operation
    const dbBooks = await User.findOne({ _id: userId });
    source === 'library'
      ? User.findOneAndUpdate(
          { _id: userId },
          {
            booksToSell: dbBooks.booksToSell.filter(
              (books: IBook) => books.ISBN !== ISBN,
            ),
          },
        ).then(() => {})
      : User.findOneAndUpdate(
          { _id: userId },
          {
            booksToBuy: dbBooks.booksToBuy.filter(
              (books: IBook) => books.ISBN !== ISBN,
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

async function getBestMatches(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const allBooks = await User.findOne({ _id: userId });
    const ISBNbooksToSell = allBooks.booksToSell.map(
      (book: IBook) => book.ISBN,
    );
    const ISBNbooksToBuy = allBooks.booksToBuy.map((book: IBook) => book.ISBN);
    const matches: string[] = [];

    for (let isbnCode of ISBNbooksToSell) {
      const usersList = await ISBNdb.findOne({ ISBN: isbnCode });
      matches.push(...usersList.UsersThatWantIt);
    }
    for (let isbnCode of ISBNbooksToBuy) {
      const usersList: IIsbn = await ISBNdb.findOne({ ISBN: isbnCode });
      if (usersList.UsersThatWantToSellIt) {
        matches.push(...usersList.UsersThatWantToSellIt);
      }
    }
    const freq: { [key: string]: number } = {};
    for (let el of matches) {
      if (Object.keys(freq).includes(el)) {
        freq[el] += 1;
      } else {
        freq[el] = 1;
      }
    }
    const sorted = Object.entries(freq).sort(([, n1], [, n2]) => {
      if ([n1] > [n2]) {
        return -1;
      }
      if ([n1] < [n2]) {
        return +1;
      }
      return 0;
    });
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
