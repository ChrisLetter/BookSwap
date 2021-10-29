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
