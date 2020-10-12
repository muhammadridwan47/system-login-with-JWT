const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./src/Routes/Users");
const authRoute = require("./src/Routes/Auth");
const topupRoute = require("./src/Routes/TopUp");
require('dotenv').config()

//midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (request, response) => {
  response.send("hello world");
});

app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/topup',topupRoute)

//GET METHOD



app.listen(process.env.DEFAULT_PORT, () => {
  console.log(`server running on port ${process.env.DEFAULT_PORT}`);
});
