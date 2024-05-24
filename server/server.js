import express from "express";
import fs from "fs/promises";
import bodyParser from "body-parser";
const app = express();
const port = 1994;
app.use(express.static("../app/dist"));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// app.use((req, res, next) => {
//   const allowedOrigins = ['http://localhost:8080'];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

app.get("/currencies", async (req, res) => {
  const buff = await fs.readFile("./currencies.json");
  const json = buff.toString();
  const currencies = JSON.parse(json);
  res.json(currencies);
});
app.get("/coins", async (req, res) => {
  const buff = await fs.readFile("./currencies.json");
  const json = buff.toString();
  const currencies = JSON.parse(json);
  const coins = currencies.map((obj) => obj.name);
  res.json(coins);
});
app.post("/currencies", async (req, res) => {
  const buff = await fs.readFile("./currencies.json");
  const json = buff.toString();
  let currencies = JSON.parse(json);
  currencies.push(req.body);
  res.json(currencies);
  const newJson = JSON.stringify(currencies);
  await fs.writeFile("./currencies.json", newJson);
});
