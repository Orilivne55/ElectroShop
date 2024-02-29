const { User } = require("../models/users.models.js");
const bcrpyt = require("bcryptjs");
const { generateToken } = require("../utils/jws.js");
const { sendMail } = require("../config/nodemail.js");
const { ShoppingCart } = require("../models/shoppingCart.models.js");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrpyt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken({
          id: user._id,
          email: user.email,
          role: "admin",
          fullName: user.fullName,
        });
        return res.send({ user, token });
      }
    }
    return res.status(401).send("Email or Pass incorrect");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const hash = await bcrpyt.hash(password, 10);
    const user = new User({ email, password: hash, fullName  });
    console.log(user);
    const shoppingCart = new ShoppingCart({ userId: user.id });
    await shoppingCart.save();
    user.ShopCartId = shoppingCart._id;
    await user.save();
    sendMail(user, "hello" , "welcome to my lovley websit :)")
  return  res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const deletUser = async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await User.findByIdAndDelete(id);
    if (isDeleted) {
      return res.send("DLTD successfuly");
    }
    return res.send("ID deleted");
  } catch (error) {
    res.status(400).send("Error");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const update = await User.findByIdAndUpdate(id, body, { new: true });
    return res.send(update);
  } catch (error) {
    res.status(400).send("Error");
  }
};

module.exports = { login, register, deletUser, updateUser, getUsers };
