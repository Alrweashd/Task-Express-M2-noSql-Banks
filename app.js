let dotenv = require("dotenv").config();

let accounts = require("./accounts");
const express = require("express");
const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");
//for mangoDB
const connectDb = require("./database");
app.use(express.json());
try {
  app.use("/accounts", accountsRoutes);
} catch (error) {
  console.log(error);
}

connectDb();
app.listen(process.env.PORT, () => {
  console.log("The application is running on localhost:8000");
});
