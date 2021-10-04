import { Request, Response } from 'express';
const UserModel = require ('../models/users');
import { Books } from '../types'

async function getAllBooks(req: Request, res: Response) {
  const { userId, source } = req.params;
  try {
    // MIGUEL WAS DEFINETLY HERE!!
    // magidkdkjdjkd
    const books = await UserModel.findOne({ _id: userId });
    const booksToSell = books?.booksToSell;
    const booksToBuy = books?.booksToBuy;
    res.status(200);
    if (source === 'library') {
      res.send(booksToSell);
    } else if (source === 'wishList') {
      res.send(booksToBuy);
    } else if (source === 'all') {
      res.send({ booksToBuy, booksToSell });
    }
  } catch (e) {
    res.sendStatus(500);
  }
}

async function addOneBook(req: Request, res: Response) {
  const { userId, source } = req.params;
  const bookToInsert = req.body;
  try {
    source === 'library'
      ? UserModel.findOneAndUpdate(
          { _id: userId },
          { $push: { booksToSell: bookToInsert } },
          { upsert: true },
        ).then()
      : UserModel.findOneAndUpdate(
          { _id: userId },
          { $push: { booksToBuy: bookToInsert } },
          { upsert: true },
        ).then();
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
}

async function removeOneBook(req: Request, res: Response) {
  const { userId, ISBN, source } = req.params;
  try {
    // TODO: refactor so that it updates without doing a double operation
    const dbBooks = await UserModel.findOne({ _id: userId });
    source === 'library'
      ? UserModel.findOneAndUpdate(
          { _id: userId },
          {
            booksToSell: dbBooks?.booksToSell.filter(
              (books: Books) => books.ISBN !== ISBN,
            ),
          },
        ).then()
      : UserModel.findOneAndUpdate(
          { _id: userId },
          {
            booksToBuy: dbBooks?.booksToBuy.filter(
              (books: Books) => books.ISBN !== ISBN,
            ),
          },
        ).then();
    // TODO: set the right status
    res.sendStatus(201);
  } catch (e) {
    res.sendStatus(500);
  }
}

export default { getAllBooks, addOneBook, removeOneBook };
