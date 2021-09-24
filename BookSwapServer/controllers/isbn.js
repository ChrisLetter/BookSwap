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
          { $push: { UsersThatWantsIt: userId } },
          { upsert: true },
        ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = { addUserToTheIsbnList };
