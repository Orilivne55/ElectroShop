const { ShoppingCart } = require("../models/shoppingCart.models");
const { User } = require("../models/users.models");

const getShoppingCart = async (req, res) => {
  const shoppingCart = await ShoppingCart.find({});
  res.send(shoppingCart);
};

const clearShoppingCart = async (req, res) => {
  const { id } = req.params;
  try {
    const shoppingCart = await ShoppingCart.findById(id);
    if (!shoppingCart) {
      console.log("Shopping cart not found for ID:", id);
      return res.status(404).json({ message: "Shopping cart not found" });
    }
    
    shoppingCart.products = [];
    await shoppingCart.save();
    
    console.log("Shopping cart cleared successfully");
    return res.status(204).send(); // Successfully cleared
  } catch (error) {
    console.log("Error clearing shopping cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getShoppingCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const shoppingCart = await ShoppingCart.findById(id)
      .populate("products.item")
      .populate("userId");
    // const productsWithCount = shoppingCart.products.map(product => {
    //   const count = shoppingCart.products.filter(p => p.item?.equals(product.item)).length;
    //   return { ...product.toObject(), count };
    // });
    res.send({ ...shoppingCart.toObject(), products: shoppingCart.products });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const updateShoppingCart = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const update = await ShoppingCart.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.send(update);
  } catch (error) {
    res.status(400).send("Error");
  }
};
const minusProductToCart = async (req, res) => {
  const { shoppingCartId, item } = req.body;
  try {
    console.log({ item });
    const shoppingCart = await ShoppingCart.findById(shoppingCartId);
    const foundIndex = shoppingCart.products.findIndex((product) => {
      return String(product.item) == item;
    });
    let data;
    console.log({ foundIndex });
    if (foundIndex != -1) {
      shoppingCart.products[foundIndex].count -= 1;
      data = await ShoppingCart.findByIdAndUpdate(
        shoppingCartId,
        { products: shoppingCart.products },
        { new: true }
      );
    } else {
      data = await ShoppingCart.findByIdAndUpdate(
        shoppingCartId,
        { $push: { products: { item } } },
        { new: true }
      );
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send("Cannot add item, bad request");
  }
};

const addProductToCart = async (req, res) => {
  const { shoppingCartId, item } = req.body;
  try {
    console.log({ item });
    const shoppingCart = await ShoppingCart.findById(shoppingCartId);
    const foundIndex = shoppingCart.products.findIndex((product) => {
      return String(product.item) == item;
    });
    let data;
    console.log({ foundIndex });
    if (foundIndex != -1) {
      shoppingCart.products[foundIndex].count += 1;
      data = await ShoppingCart.findByIdAndUpdate(
        shoppingCartId,
        { products: shoppingCart.products },
        { new: true }
      );
    } else {
      data = await ShoppingCart.findByIdAndUpdate(
        shoppingCartId,
        { $push: { products: { item } } },
        { new: true }
      ).populate("products.item");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send("Cannot add item, bad request");
  }
};

const deletShoppingCart = async (req, res) => {
  const { id } = req.params;
  try {
    const isDeleted = await ShoppingCart.findByIdAndDelete(id);
    return await res.send(isDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const newShoppingCart = async (req, res) => {
  const body = req.body;
  try {
    console.log(req.user);
    body.userId = req.user.id;
    const shoppingCart = new ShoppingCart(body);
    await shoppingCart.save();
    res.send({ message: "added", data: body });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

module.exports = {
  newShoppingCart,
  deletShoppingCart,
  updateShoppingCart,
  getShoppingCart,
  getShoppingCartById,
  addProductToCart,
  minusProductToCart,
  clearShoppingCart,
};
