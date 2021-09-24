const ISBNdb = require('../models/isbn');

async function addUserToTheIsbnList(req, res) {
  const { userId, ISBN, source } = req.params;
  try {
    source === 'sell'
      ? ISBNdb.findOneAndUpdate(
          { ISBN: ISBN },
          { $push: { UsersThatWantToSellIt: userId } },
          { upsert: true },
        ).then(() => {})
      : ISBNdb.findOneAndUpdate(
          { ISBN: ISBN },
          { $push: { UsersThatWantIt: userId } },
          { upsert: true },
        ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function removeUserFromTheIsbnList(req, res) {
  const { userId, ISBN, source } = req.params;
  try {
    source === 'sell'
      ? ISBNdb.findOneAndUpdate(
          { ISBN: ISBN },
          { $pull: { UsersThatWantToSellIt: userId } },
        ).then(() => {})
      : ISBNdb.findOneAndUpdate(
          { ISBN: ISBN },
          { $pull: { UsersThatWantIt: userId } },
        ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = { addUserToTheIsbnList, removeUserFromTheIsbnList };
