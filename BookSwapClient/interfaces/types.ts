import { IConversation, IRequest, IBook, IAllBooks } from './interfaces';

export type LibraryStackParamList = {
  'Your Library': undefined;
  'Insert A New Book': undefined;
  'Select a Book From The List': {
    FormInfo: { title: string; authors: string; isbn: string };
  };
  'Scan ISBN code': undefined;
  'Book Added Successfully': undefined;
  'Confirm the Book': { scannedISBN: any };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type ChatStackParamList = {
  Messages: undefined;
  Chat: {
    messages: IConversation;
    otherUser: string;
  };
};

export type WishListStackParamList = {
  'Your Wish List': undefined;
  'Add a New Book': undefined;
  'Select one Book': {
    FormInfo: { title: string; authors: string; isbn: string };
  };
  'Inserted Successfully': undefined;
};

export type RequestsStackParamList = {
  'All Requests': undefined;
  'Details of the Request': {
    request: IRequest;
  };
  RequestAccepted: undefined;
  Chat: undefined;
};

export type BestMatchesStackParamList = {
  'Best Matches': undefined;
  'Send Request': {
    UsersInfo: {
      booksCurrUser: IAllBooks;
      UserMatch: string;
      Username: string;
    };
  };
  'Add Details To The Request': {
    matchesFromWishList: IBook[];
    matchesFromLibraryToSell: IBook[];
    UserMatch: string;
    UsernameOtherUser: string;
  };
  'Request Sent': undefined;
};
