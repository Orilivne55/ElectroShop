const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users.routes");
const shoppingCartRoutes = require("./routes/shoppingCart.routes");
const productsRoutes = require("./routes/products.routes");
const paymentRoutes = require('./routes/payment.routes');
const orederRoutes = require('./routes/order.routes');
const contactRoutes = require('./routes/contact.routes')



const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/shoppingCart", shoppingCartRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/order",orederRoutes)
app.use("/api/v1/contact",contactRoutes)




module.exports = { app };
