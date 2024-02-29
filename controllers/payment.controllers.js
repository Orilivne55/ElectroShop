const { Payment } = require("../models/payment.models");

async function getAllPayments(req, res) {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (err) {
    res.status(400).send("Error");
  }
}

async function createPayment(req, res) {
  const payment = new Payment({
    userId: req.body.userId,
    orderId: req.body.orderId,
    paymentMethod: req.body.paymentMethod,
    amount: req.body.amount,
    currency: req.body.currency,
  });

  try {
    const newPayment = await payment.save();
    res.status(201).send(newPayment);
  } catch (err) {
    res.status(400).send("Error");
  }
}

async function getPayment(req, res) {
  res.send(res.payment);
}

async function updatePayment(req, res) {
  if (req.body.userId != null) {
    res.payment.userId = req.body.userId;
  }
  if (req.body.orderId != null) {
    res.payment.orderId = req.body.orderId;
  }
  if (req.body.paymentMethod != null) {
    res.payment.paymentMethod = req.body.paymentMethod;
  }
  if (req.body.amount != null) {
    res.payment.amount = req.body.amount;
  }
  if (req.body.currency != null) {
    res.payment.currency = req.body.currency;
  }
  try {
    const updatedPayment = await res.payment.save();
    res.status.send(updatedPayment);
  } catch (err) {
    res.status(400).send("Error");
  }
}

async function deletePayment(req, res) {
  try {
    await res.payment.remove();
    res.send("Payment Succeeded")
  } catch (err) {
    res.status(400).send("Error");
  }
}

module.exports = {
  getAllPayments,
  createPayment,
  getPayment,
  updatePayment,
  deletePayment,
};
