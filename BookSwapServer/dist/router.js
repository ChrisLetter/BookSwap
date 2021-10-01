"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./controllers/auth"));
const books_1 = __importDefault(require("./controllers/books"));
const isbn_1 = __importDefault(require("./controllers/isbn"));
const requests_1 = __importDefault(require("./controllers/requests"));
const messages_1 = __importDefault(require("./controllers/messages"));
const router = express_1.default.Router();
// Auth
router.post('/register', auth_1.default.create);
router.post('/login', auth_1.default.login);
router.get('/username/:userId', auth_1.default.getUsername);
// Books
router.get('/books/:userId/:source', books_1.default.getAllBooks);
router.post('/books/:userId/:source', books_1.default.addOneBook);
router.delete('/books/:userId/:ISBN/:source', books_1.default.removeOneBook);
// ISBN
router.post('/isbn/:userId/:ISBN/:source', isbn_1.default.addUserToTheIsbnList);
router.delete('/isbn/:userId/:ISBN/:source', isbn_1.default.removeUserFromTheIsbnList);
router.get('/isbn/:ISBN', isbn_1.default.getAllUsersOfISBN);
// Requests
router.get('/requests/:userId', requests_1.default.getRequests);
router.post('/requests/:userId', requests_1.default.addOneRequest);
router.put('/requests/:idUser/:idOtherUser/:receiverOrSender/:trueOrFalse', requests_1.default.changeViewedPropertyOfRequest);
router.delete('/requests/:idUser/:idOtherUser/:receiverOrSender', requests_1.default.deleteRequest);
router.put('/requests/:idUser/:idOtherUser/:status/:receiverOrSender/status', requests_1.default.changeStatusRequest);
// Messages
router.get('/messages/:idUser', messages_1.default.getAllMessages);
router.post('/messages/:idUser/:idOtherUser/:otherUsername?', messages_1.default.addMessage);
router.put('/messages/:idUser/:idOtherUser/:trueOrFalse/notification', messages_1.default.toggleNotificationChat);
exports.default = router;
