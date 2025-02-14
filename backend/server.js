require('dotenv').config();
const express = require('express')
const  db = require('./config/db')
const app = express()

const ownersRouter=require("./routes/owner_router");
const usersRouter=require("./routes/user_router");
const productsRouter = require("./routes/product_router");
const categoryRouter= require("./routes/category_route")
const bannerRouter = require("./routes/banner_router")
const cartRouter = require("./routes/cart_route");
const orderRouter = require("./routes/oreder_router");
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello everyone')
})
app.use("/admin", ownersRouter);
app.use('/users',usersRouter);
app.use("/category", categoryRouter);
app.use('/products',productsRouter);
app.use("/slider",bannerRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter)

app.listen(5000)