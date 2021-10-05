const express = require('express');
const router = require('../router');
// Db
const UserModel = require('../models/users');
const { setupDB } = require('../test-utils/test-setup');
// Supertest
const supertest = require('supertest');

const dbName = 'test';

const mockRegisterUser = {
  username: 'jhon.doe',
  email: 'jhon.doe@gmail.com',
  userPassword: '123456',
};

describe('ISBN Endpoints', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  setupDB(dbName);

  it('POST /register should register a user', async () => {
    const res = await request.post('/register').send(mockRegisterUser);

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    // expect(res.body).toHaveProperty('accessToken');
    // expect(res.body).toHaveProperty('id');
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.id).toBeTruthy();
  });

  it('POST /login should login a user', async () => {
    // Register User
    await request.post('/register').send(mockRegisterUser);

    // Login user from endpoint
    const res = await request.post('/login').send({
      email: mockRegisterUser.email,
      userPassword: mockRegisterUser.userPassword,
    });

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    // expect(res.body).toHaveProperty('accessToken');
    // expect(res.body).toHaveProperty('id');
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.id).toBeTruthy();
  });

  it('GET /username/:userId should get username from a user', async () => {
    // Create user to Db
    const { _id, username } = await UserModel.create(mockRegisterUser);

    // Retrieve username from endpoint
    const res = await request.get(`/username/${_id.toString()}`);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    // expect(res.body).toHaveProperty('accessToken');
    // expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe(username);
  });
});

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
