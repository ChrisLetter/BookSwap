export interface IUser {
  id: string;
  token: string;
  auth: boolean;
}

export interface IConversation {
  lastMessage: number;
  msgs: IMessage[];
  notification: boolean;
  otherUser: string;
  otherUsername: string;
}

export interface IMessage {
  content: string;
  timeStamp: number;
  userFrom: string;
  userTo: string;
}

export interface IBookFromGoogleIsbnScan {
  imageLinks: { [key: string]: string };
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
}

export interface IBook {
  ISBN: string;
  authors: string[];
  publishedData: string;
  publisher: string;
  thumbnail: string;
  title: string;
}

export interface IRequest {
  askingMoney: boolean;
  booksAsked: IBook[];
  booksOffered: IBook[];
  comment: string;
  hasBeenViewed: boolean;
  monetaryCompensation: boolean;
  monetaryCompensationValue: string;
  status: string;
  timeStamp: number;
  userFrom: string;
  userFromUsername: string;
  userTo: string;
  userToUsername: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  userPassword: string;
}

export interface ILoginrUser {
  email: string;
  userPassword: string;
}
