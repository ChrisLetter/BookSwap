const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/users');
const { SECRET_KEY } = require('../../ignoredFile');

const create = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res
      .status(409)
      .send({ error: '409', message: 'Could not create an user' });
  }
  try {
    if (password === '') {
      throw new Error();
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const id = _id.toString();
    const accessToken = jwt.sign({ data: id }, SECRET_KEY, { expiresIn: '6h' });
    res.status(201).send({ accessToken, id });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) {
      throw new Error();
    }
    const id = user._id;
    const accessToken = jwt.sign({ _id: id }, SECRET_KEY);
    res.status(200).send({ accessToken, id });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

module.exports = { create, login };
