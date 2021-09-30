const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const { SECRET_KEY } = require('../../ignoredFile');

// Abriele-branch was here
const create = async (req, res) => {
  const { email, userPassword } = req.body;
  const user = await User.findOne({ email: email });
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
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const id = _id.toString();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken, id });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req, res) => {
  const { email, userPassword } = req.body;
  try {
    const { _id, password } = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(userPassword, password);
    if (!validatedPass) {
      throw new Error();
    }
    const id = _id.toString();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken, id });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const getUsername = async (req, res) => {
  const { userId } = req.params;
  try {
    const userInfos = await User.findOne({ _id: userId });
    const username = userInfos.username;
    res.status(201).send({ username });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = { create, login, getUsername };
