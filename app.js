//for the secret values in the project like db url
//to access the port number
let dotenv = require("dotenv").config();

const express = require("express");
const app = express();

const accountsRoutes = require("./api/accounts/accounts.routes");

//for mangoDB
const connectDb = require("./database");
connectDb();

app.use(express.json());

app.use("/accounts", accountsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
