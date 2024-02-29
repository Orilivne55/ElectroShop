const { Router } = require("express");
const {
  creatContactMessage,
} = require("../controllers/contact.controllers.js");
const { auth } = require("../middlewares/auth.js");

const router = Router();

router.post("/", auth, creatContactMessage);

module.exports = router;
