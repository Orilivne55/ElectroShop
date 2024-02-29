const { Router } = require("express");
const {
    newProduct,
    deletProduct,
    updateProduct,
    getPruductById,
    getPruduct,
    addImageProduct,
  } = require("../controllers/products.controllers")
  const { auth } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
  
const router = Router()

router.get("/",getPruduct)

router.post('/image/:id', upload.single("productImage"), addImageProduct)

router.get("/:id",getPruductById)

router.post("/",auth,newProduct)

router.delete("/:id",deletProduct)

router.patch("/:id",updateProduct)

module.exports = router;