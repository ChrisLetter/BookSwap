const User = require('../models/users.js');

async function getRequests(req, res) {
  const userId = req.params.userId;
  try {
    const books = await User.findOne({ _id: userId });
    res.status(200);
    res.send(books.requests.sort((a, b) => b.timeStamp - a.timeStamp));
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function addOneRequest(req, res) {
  const userId = req.params.userId;
  const requestToInsert = req.body;
  try {
    User.findOneAndUpdate(
      { _id: userId },
      { $push: { requests: requestToInsert } },
      { upsert: true },
    ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = { getRequests, addOneRequest };
