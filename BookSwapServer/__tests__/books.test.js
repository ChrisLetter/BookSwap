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

const mockBooks = (arg) => ({
  title: `Book ${arg}`,
  authors: [`Author ${arg}`],
  ISBN: `${arg}`,
  publisher: `Publisher ${arg}`,
  thumbnail: '-',
  publishedDate: '-',
});

describe('Books Endpoints', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);
  setupDB(dbName);

  describe('GET /books/:userId/:source', () => {
    it('Library source', async () => {
      // Create user to Db
      const { _id, booksToSell } = await UserModel.create({
        ...mockRegisterUser,
        booksToSell: [mockBooks(1), mockBooks(2)],
        booksToBuy: [mockBooks(3), mockBooks(4)],
      });

      // Retrieve books from user
      const res = await request.get(`/books/${_id}/library`);

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      //   expect(res.body).toBe(booksToSell);
      expect(res.body).toEqual(booksToSell);
    });

    it('Wishlist source', async () => {
      // Create user to Db
      const { _id, booksToBuy } = await UserModel.create({
        ...mockRegisterUser,
        booksToSell: [mockBooks(1), mockBooks(2)],
        booksToBuy: [mockBooks(3), mockBooks(4)],
      });

      // Retrieve books from user
      const res = await request.get(`/books/${_id}/wishList`);

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      // expect(res.body).toBe(booksToBuy);
      expect(res.body).toEqual(booksToBuy);
    });

    it('All source', async () => {
      // Create user to Db
      const { _id, booksToBuy, booksToSell } = await UserModel.create({
        ...mockRegisterUser,
        booksToSell: [mockBooks(1), mockBooks(2)],
        booksToBuy: [mockBooks(3), mockBooks(4)],
      });

      // Retrieve books from user
      const res = await request.get(`/books/${_id}/all`);

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      //   expect(res.body).toBe({ booksToBuy, booksToSell });
      expect(res.body).toEqual({ booksToBuy, booksToSell });
    });
  });

  describe('POST /books/:userId/:source', () => {
    it('Add one book to library', async () => {
      // Create user to Db
      const { _id, booksToSell } = await UserModel.create({
        ...mockRegisterUser,
        booksToSell: [mockBooks(1)],
      });
      booksToSell.push(mockBooks(2));

      // Add a book to a user
      const postRes = await request
        .post(`/books/${_id}/library`)
        .send(mockBooks(2));
      expect(postRes.status).toEqual(201);

      // Retrieve books from user
      const getRes = await request.get(`/books/${_id}/library`);

      expect(getRes.status).toEqual(200);
      expect(getRes.type).toEqual(expect.stringContaining('json'));
      expect(getRes.body).toEqual(booksToSell);
    });

    it('Add one book to wishList', async () => {
      // Create user to Db
      const { _id, booksToBuy } = await UserModel.create({
        ...mockRegisterUser,
        booksToBuy: [mockBooks(1)],
      });
      booksToBuy.push(mockBooks(2));

      // Add a book to a user
      const postRes = await request
        .post(`/books/${_id}/wishList`)
        .send(mockBooks(2));
      expect(postRes.status).toEqual(201);

      // Retrieve books from user
      const getRes = await request.get(`/books/${_id}/wishList`);

      expect(getRes.status).toEqual(200);
      expect(getRes.type).toEqual(expect.stringContaining('json'));
      expect(getRes.body).toEqual(booksToBuy);
    });
  });

  describe('DELETE /books/:userId/:ISBN/:source', () => {
    it('Remove one book from library', async () => {
      // Create user to Db
      const { _id, booksToSell } = await UserModel.create({
        ...mockRegisterUser,
        booksToSell: [mockBooks(1)],
      });

      // Add a book to a user
      const postRes = await request.delete(
        `/books/${_id}/${booksToSell[0].ISBN}/library`,
      );
      expect(postRes.status).toEqual(201);

      // Retrieve books from user
      const getRes = await request.get(`/books/${_id}/library`);

      expect(getRes.status).toEqual(200);
      expect(getRes.type).toEqual(expect.stringContaining('json'));
      expect(getRes.body).toEqual([]);
    });

    it('Remove one book from wishList', async () => {
      // Create user to Db
      const { _id, booksToBuy } = await UserModel.create({
        ...mockRegisterUser,
        booksToBuy: [mockBooks(1)],
      });

      // Add a book to a user
      const postRes = await request.delete(
        `/books/${_id}/${booksToBuy[0].ISBN}/wishList`,
      );
      expect(postRes.status).toEqual(201);

      // Retrieve books from user
      const getRes = await request.get(`/books/${_id}/wishList`);

      expect(getRes.status).toEqual(200);
      expect(getRes.type).toEqual(expect.stringContaining('json'));
      expect(getRes.body).toEqual([]);
    });
  });
});

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
