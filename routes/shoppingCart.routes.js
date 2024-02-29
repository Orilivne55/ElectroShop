const { Router } = require("express");
const {
  newShoppingCart,
  updateShoppingCart,
  getShoppingCart,
  getShoppingCartById,
  addProductToCart,
  minusProductToCart,
  clearShoppingCart,
} = require("../controllers/shoppingCart.controllers");
const { auth } = require("../middlewares/auth");

const router = Router();

router.get("/", getShoppingCart);

router.get("/:id", getShoppingCartById);

router.patch("/:id", updateShoppingCart);

router.post("/addProductToCart",auth,addProductToCart)

router.post("/minusProductToCart",auth,minusProductToCart)

router.post("/",auth, newShoppingCart)

router.post("/clearShopingCart/:id", clearShoppingCart)

module.exports = router;