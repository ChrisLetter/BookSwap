import { Request, Response } from 'express';
import ISBNdb from '../models/isbn';

async function addUserToTheIsbnList(req: Request, res: Response ) {
  const { userId, ISBN, source } = req.params;
  try {
    source === 'sell'
      ? ISBNdb.findOneAndUpdate(
          { ISBN },
          { $push: { UsersThatWantToSellIt: userId } },
          { upsert: true },
        )
      : ISBNdb.findOneAndUpdate(
          { ISBN },
          { $push: { UsersThatWantIt: userId } },
          { upsert: true },
        )
    res.sendStatus(201);
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
}

async function removeUserFromTheIsbnList(req: Request, res: Response ) {
  const { userId, ISBN, source } = req.params;
  try {
    source === 'sell'
      ? ISBNdb.findOneAndUpdate(
          { ISBN },
          { $pull: { UsersThatWantToSellIt: userId } },
        )
      : ISBNdb.findOneAndUpdate(
          { ISBN },
          { $pull: { UsersThatWantIt: userId } },
        )
    res.sendStatus(201);
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
}

async function getAllUsersOfISBN(req: Request, res: Response ) {
  const ISBN = req.params.ISBN;
  try {
    const usersList = await ISBNdb.findOne({ ISBN });
    res.status(200);
    res.send(usersList);
  } catch (e) {
    res.sendStatus(500);
  }
}

export default {
  addUserToTheIsbnList,
  removeUserFromTheIsbnList,
  getAllUsersOfISBN,
};
