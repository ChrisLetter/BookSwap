import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
const UserModel = require ('../models/users');
import { IUser } from '../types';



const create = async (req: Request, res: Response ) => {
  const { email, userPassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res
      .status(409)
      .send({ error: '409', message: 'Could not create an user' });
  }
  try {
    if (userPassword === '') {
      throw new Error();
    }
    const hash = await bcrypt.hash(userPassword, 10);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const id = _id.toString();
    const accessToken = jwt.sign({ _id }, 'v3ry!str0ngP4ss');
    res.status(201).send({ accessToken, id });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req: Request, res: Response)  => {
  const { email, userPassword } = req.body;
  try {
    const user1:IUser | null = await UserModel.findOne({ email });

    // let _id;
    // let password;
    if(user1){
      const {_id, password} = user1
      const validatedPass = await bcrypt.compare(userPassword, password);
      if (!validatedPass) {
        throw new Error();
      }
      const id = _id.toString();
      const accessToken = jwt.sign({ _id }, 'v3ry!str0ngP4ss');
      res.status(201).send({ accessToken, id });
    }

  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Email or password is incorrect' });
  }
};

const getUsername = async (req: Request, res: Response ) => {
  const { userId } = req.params;
  try {
    const userInfos = await UserModel.findOne({ _id: userId });
    const username = userInfos?.username;
    res.status(200).send({ username });
  } catch (error) {
    res.status(500);
    // console.log(error);
  }
};

export default { create, login, getUsername };
