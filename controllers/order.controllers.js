const { sendMail } = require("../config/nodemail");
const { Order } = require("../models/order.models");

async function createOrder(req, res) {
  try {
    const order = await Order.create(req.body);
    res.status(201).send(order);
    sendMail(req.user, `Dear ${req.user.fullName}, your order has been sent to ${order.shippingAddress}`);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(201).send(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).send("Error 404");
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
}

async function updateOrder(req, res) {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true,
    });
    if (!order) {
      res.status(404).send("Error 404");
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).send("Order not found" );
    }
    res.send("Order deleted successfully" );
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
}

module.exports = {
  deleteOrder,
  updateOrder,
  getOrderById,
  getAllOrders,
  createOrder,
};
