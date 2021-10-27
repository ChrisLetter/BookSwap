const User = require('../models/users');

async function getAllMessages(req, res) {
  const { idUser } = req.params;
  try {
    const userInfos = await User.findOne({ _id: idUser });
    res.status(200);
    res.send(userInfos.messages.reverse());
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function addMessage(req, res) {
  const { idUser, idOtherUser, otherUsername } = req.params;
  const messageInfos = req.body;
  try {
    const allUserInfos = await User.findOne({ _id: idUser });
    const prevUserMsgs = allUserInfos.messages;
    const msgToChange = prevUserMsgs.filter(
      (msg) => msg.otherUser === idOtherUser,
    );
    const otherMessagesToKeep = prevUserMsgs.filter(
      (msg) => msg.otherUser !== idOtherUser,
    );
    if (msgToChange.length === 0) {
      const msgToInsert = {
        otherUser: idOtherUser,
        otherUsername: otherUsername,
        msgs: [messageInfos],
        lastMessage: messageInfos.timeStamp,
        notification: false,
      };
      otherMessagesToKeep.push(msgToInsert);
    } else {
      msgToChange[0].msgs.push(messageInfos);
      msgToChange[0].lastMessage = messageInfos.timeStamp;
      otherMessagesToKeep.push(msgToChange[0]);
    }
    await User.findOneAndUpdate(
      { _id: idUser },
      { messages: otherMessagesToKeep },
    ).then(() => {
      res.sendStatus(201);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function toggleNotificationChat(req, res) {
  const { idUser, idOtherUser, trueOrFalse } = req.params;
  try {
    const allUserInfos = await User.findOne({ _id: idUser });
    const prevUserMsgs = allUserInfos.messages;
    const msgToChange = prevUserMsgs.filter(
      (msg) => msg.otherUser === idOtherUser,
    );
    const otherMessagesToKeep = prevUserMsgs.filter(
      (msg) => msg.otherUser !== idOtherUser,
    );
    trueOrFalse === 'true'
      ? (msgToChange[0].notification = true)
      : (msgToChange[0].notification = false);
    otherMessagesToKeep.push(msgToChange[0]);
    User.findOneAndUpdate(
      { _id: idUser },
      { messages: otherMessagesToKeep },
    ).then(() => {});
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  getAllMessages,
  addMessage,
  toggleNotificationChat,
};
