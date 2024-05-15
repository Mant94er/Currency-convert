const currencies = require("./currencies.js");
const express = require("express");
const app = express();
const port = 1994;
const coins = [];
app.use(express.static("dist"));
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:8080"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
app.get("/", (req, res) => {
  console.log("I provided a response");
  res.send(currencies);
});
app.get("/currencies", (req, res) => {
  res.send(currencies);
});
app.get("/coins", (req, res) => {
  res.send(currencies.name);
});
