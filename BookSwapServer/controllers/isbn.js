const ISBNdb = require('../models/isbn');

async function addUserToTheSellingList(req, res) {
  const { userId, ISBN } = req.params;
  try {
    ISBNdb.findOneAndUpdate(
      { ISBN: ISBN },
      { $push: { UsersThatWantToSellIt: userId } },
      { upsert: true },
    ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = { addUserToTheSellingList };
