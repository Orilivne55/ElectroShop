const { Router } = require("express");
const {
  getAllPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controllers");
const router = Router();

router.get("/", getAllPayments);

router.post("/", createPayment);

router.get("/:id", getPayment);

router.patch("/:id", updatePayment);

router.delete("/:id", deletePayment);

module.exports = router;
