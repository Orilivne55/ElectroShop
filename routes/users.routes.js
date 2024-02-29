const { Router } = require("express");
const {
  register,
  login,
  deletUser,
  updateUser,
  getUsers,
} = require("../controllers/users.controllers");
const { auth, authorize } = require("../middlewares/auth");
const { User } = require("../models/users.models");
const router = Router();

router.get("/", getUsers);

router.post("/register", register);

router.post("/login", login);

router.delete("/:id", auth, authorize(["admin"]), deletUser);

router.patch("/:id", auth, authorize(["employee", "admin"]), updateUser);

router.get("/init-user", auth, async (req, res) => {
  const user = req.user;
  try {
    const dbUser = await User.findById(user.id);
    res.send(dbUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
