import { Document, Model, Mongoose } from "mongoose"
import { ObjectId } from "mongodb";

export interface IUser {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    booksToSell: Books[];
    booksToBuy: Books[];
    requests: Request[];
    messages: Messages[];
}

export interface ISBN {
    ISBN: string;
    UsersThatWantIt: Books[];
    UsersThatWantToSellIt: Books[];
}

export interface Books {
    title: string;
    authors: string[];
    ISBN: string;
    publisher: string;
    thumbnail: string;
    publishedDate: string;
}

export interface BooksToBuy {
    title: string;
    authors: string[];
    ISBN: string;

}

// MESSAGES
export interface Messages{
    otherUser: string,
    otherUsername: string,
    msgs: Msgs[],
    lastMessage: number,
    notification: boolean
}

export interface Msgs {
    userFrom: string;
    userTo: string;
    content: string;
    timestamp: string
}

export interface Request {
    userFrom: string;
    userFromUsername: string;
    userTo: string;
    userToUsername: string;
    booksOffered: Books[];
    booksAsked: Books[];
    monetaryCompensation: boolean;
    monetaryCompensationValue: string;
    askingMoney: boolean;
    comment: string;
    status: string;
    timeStamp: number;
    hasBeenViewed: boolean;
}

