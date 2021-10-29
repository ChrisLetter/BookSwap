import { IConversation, IRequest } from './interfaces';

export type LibraryStackParamList = {
  'Your Library': undefined;
  'Insert A New Book': undefined;
  'Select a Book From The List': {
    FormInfo: { title: string; authors: string; isbn: string };
  };
  ScanISBN: undefined;
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
