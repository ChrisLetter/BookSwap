const express = require('express');
const router = require('../router');
// Mock
// import completeMockUser from '../mock';
// Db
const { setupDB } = require('./test-setup');
// Supertest
const supertest = require('supertest');

const dbName = 'test';

const mockUser = {
  username: 'jhon.doe',
  email: 'jhon.doe@gmail.com',
  userPassword: '123456',
};

describe('Auth Endpoints', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  setupDB(dbName);

  it('GET /register should register a user', async () => {
    const res = await request.post('/register').send(mockUser);

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    // expect(res.body).toHaveProperty('accessToken');
    // expect(res.body).toHaveProperty('id');
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.id).toBeTruthy();
  });

  it('GET /login should login a user', async () => {
    const res = await request.post('/register').send(mockUser);

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    // expect(res.body).toHaveProperty('accessToken');
    // expect(res.body).toHaveProperty('id');
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.id).toBeTruthy();
  });
});

// // Auth
// router.post('/register', auth.create);
// router.post('/login', auth.login);
// router.get('/username/:userId', auth.getUsername);

// // Books
// router.get('/books/:userId/:source', books.getAllBooks);
// router.post('/books/:userId/:source', books.addOneBook);
// router.delete('/books/:userId/:ISBN/:source', books.removeOneBook);

// // ISBN
// router.post('/isbn/:userId/:ISBN/:source', isbn.addUserToTheIsbnList);
// router.delete('/isbn/:userId/:ISBN/:source', isbn.removeUserFromTheIsbnList);
// router.get('/isbn/:ISBN', isbn.getAllUsersOfISBN);

// // Requests
// router.get('/requests/:userId', requests.getRequests);
// router.post('/requests/:userId', requests.addOneRequest);
// router.put(
//   '/requests/:idUser/:idOtherUser/:receiverOrSender/:trueOrFalse',
//   requests.changeViewedPropertyOfRequest,
// );
// router.delete(
//   '/requests/:idUser/:idOtherUser/:receiverOrSender',
//   requests.deleteRequest,
// );
// router.put(
//   '/requests/:idUser/:idOtherUser/:status/:receiverOrSender/status',
//   requests.changeStatusRequest,
// );

// // Messages
// router.get('/messages/:idUser', messages.getAllMessages);
// router.post(
//   '/messages/:idUser/:idOtherUser/:otherUsername?',
//   messages.addMessage,
// );
// router.put(
//   '/messages/:idUser/:idOtherUser/:trueOrFalse/notification',
//   messages.toggleNotificationChat,
// );
