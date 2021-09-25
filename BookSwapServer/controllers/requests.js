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

async function changeViewedPropertyOfRequest(req, res) {
  // TODO: refactor so that it updates without doing a double operation

  // HOW TO USE IT : in the url I need to set first of all my target user (idUser), then the other user, finally I have to
  // specify if the target user is the sender or the receiver of the request and if I want to set hasBeenViewed to True or False

  const { idUser, idOtherUser, receiverOrSender, trueOrFalse } = req.params;
  try {
    const userInfos = await User.findOne({ _id: idUser });
    for (let el of userInfos.requests) {
      if (
        (receiverOrSender === 'receiver' ? el.userFrom : el.userTo) ===
        idOtherUser
      ) {
        el.hasBeenViewed = trueOrFalse === 'true' ? true : false;
      }
    }
    // await userInfos.save();
    User.findOneAndUpdate(
      { _id: idUser },
      { requests: userInfos.requests },
    ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function deleteRequest(req, res) {
  // TODO: refactor so that it updates without doing a double operation

  // HOW TO USE IT : in the url I need to set first of all my target user (idUser), then the other user, finally I have to
  // specify if the target user is the sender or the receiver of the request that I want to delete

  const { idUser, idOtherUser, receiverOrSender } = req.params;
  try {
    const userInfos = await User.findOne({ _id: idUser });
    const temp = userInfos.requests.filter(
      (request) =>
        (receiverOrSender === 'receiver'
          ? request.userFrom
          : request.userTo) !== idOtherUser,
    );
    User.findOneAndUpdate({ _id: idUser }, { requests: temp }).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function changeStatusRequest(req, res) {
  // TODO: refactor so that it updates without doing a double operation
  const { idUser, idOtherUser, status, receiverOrSender } = req.params;
  try {
    const userInfos = await User.findOne({ _id: idUser });
    for (let el of userInfos.requests) {
      if (
        (receiverOrSender === 'receiver' ? el.userFrom : el.userTo) ===
        idOtherUser
      ) {
        el.status = status;
      }
    }
    User.findOneAndUpdate(
      { _id: idUser },
      { requests: userInfos.requests },
    ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  getRequests,
  addOneRequest,
  changeViewedPropertyOfRequest,
  deleteRequest,
  changeStatusRequest,
};
