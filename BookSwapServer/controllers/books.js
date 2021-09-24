const User = require('../models/users.js');

async function getAllBooks(req, res) {
  const userId = req.params.userId;
  // console.log(req.params.userId);

  try {
    const books = await User.findOne({ _id: userId });
    const booksToSell = books.booksToSell;
    res.status(200);
    res.send(booksToSell);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function addBookToLibrary(req, res) {
  const userId = req.params.userId;
  console.log(req.params);
  const bookToInsert = req.body;
  console.log(req.body);
  try {
    User.findOneAndUpdate(
      { _id: userId },
      { $push: { booksToSell: bookToInsert } },
      { upsert: true },
    ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = { getAllBooks, addBookToLibrary };
