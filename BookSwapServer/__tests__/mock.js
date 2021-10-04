export const mock = {
  username: 'Chris Letter',
  email: 'ChrisLetter@gmail.com',
  password: 'password',
  booksToSell: [
    {
      title: 'book 1',
      authors: '',
      ISBN: '123456789',
      publisher: 'publisher 1',
      thumbnail: '-',
      publishedDate: '2014-11-04',
    },
  ],
  booksToBuy: [
    {
      title: 'book 2',
      authors: '',
      ISBN: '123',
      publisher: 'publisher 2',
      thumbnail: '-',
      publishedDate: '2016-11-04',
    },
  ],
  request: [
    {
      userFrom: '123',
      userFromUsername: 'Jhon Doe',
      userTo: '321',
      userToUsername: 'Chris Letter',
      hasBeenViewed: true,
      booksOffered: [
        {
          title: 'book 1',
          authors: '',
          ISBN: '123456789',
          publisher: 'publisher 1',
          thumbnail: '-',
          publishedDate: '2014-11-04',
        },
      ],
      booksAsked: [
        {
          title: 'book 1',
          authors: '',
          ISBN: '1234',
          publisher: 'publisher 3',
          thumbnail: '-',
          publishedDate: '2016-11-04',
        },
      ],
      monetaryCompensation: true,
      monetaryCompensationValue: '10',
      askingMoney: false,
      comment: 'Please accept',
      status: 'inProgress',
      timeStamp: 12345,
    },
  ],
  messages: [
    {
      otherUser: '12345',
      otherUserame: 'Jhon Doe',
      msgs: [
        {
          userFrom: 'startingMessage',
          userTo: 'startingMessage',
          content: 'You accepted the request! Discuss further with user',
          timeStamp: 15234,
        },
      ],
      lastMessage: 12345566,
      notification: false,
    },
  ],
};
