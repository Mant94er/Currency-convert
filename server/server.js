import express from 'express';
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
const app = express();
const port = 1994;
app.use(express.static('../dist'));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get('/currencies', async (req, res) => {
  const buff = await fs.readFile('./currencies.json');
  const json = buff.toString();
  const currencies = JSON.parse(json);
  res.json(currencies);
});
app.get('/*', (req, res) => {
  res.sendFile(
    'C:/Users/manwl/Downloads/Currency conversion project/dist/index.html'
  );
});
app.post('/currencies', async (req, res) => {
  const buff = await fs.readFile('./currencies.json');
  const json = buff.toString();
  let currencies = JSON.parse(json);
  const coins = currencies.map((coin) => coin.name);
  if (coins.includes(req.body.name)) {
    const updatedCurrency = currencies.find(
      (cur) => cur.name === req.body.name
    );
    currencies.splice(currencies.indexOf(updatedCurrency), 1, req.body);
    res.json(currencies);
    const newJson = JSON.stringify(currencies);
    await fs.writeFile('./currencies.json', newJson);
  } else {
    currencies.push(req.body);
    res.json(currencies);
    const newJson = JSON.stringify(currencies);
    await fs.writeFile('./currencies.json', newJson);
  }
});
app.post('/accounts', async (req, res) => {
  const buff = await fs.readFile('./accounts.json');
  const json = buff.toString();
  let accounts = JSON.parse(json);
  const users = accounts.map((user) => user.user);
  if (users.includes(req.body.user)) {
    res.status(404).send('Something went wrong!');
    return;
  }
  const password = req.body.password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const newUser = { user: req.body.user, password: hash };
      accounts.push(newUser);
      res.json(newUser);
      const newJson = JSON.stringify(accounts);
      fs.writeFile('./accounts.json', newJson);
    });
  });
});
app.post('/account', async (req, res) => {
  const buff = await fs.readFile('./accounts.json');
  const jason = buff.toString();
  const accounts = JSON.parse(jason);
  const loggingUser = accounts.find((user) => user.user === req.body.user);
  if (!!loggingUser) {
    bcrypt.compare(req.body.password, loggingUser.password, (err, result) => {
      if (err) res.status(404);
      if (result) res.json(loggingUser);
    });
  } else {
    res.status(404);
  }
  // if (
  //   users.includes(req.body.user) &&
  //   passwords.includes(req.body.password) &&
  //   users.indexOf(req.body.user) === passwords.indexOf(req.body.password)
  // ) {
  //   res.json(req.body);
  // } else {
  //   res.status(404).send('Something went wrong!');
  // }
});
app.post('/removals', async (req, res) => {
  const buff = await fs.readFile('./currencies.json');
  const json = buff.toString();
  let currencies = JSON.parse(json);
  const oldCoin = currencies.find((coin) => coin.name === req.body.name);
  currencies = currencies.filter((coin) => coin !== oldCoin);
  res.json(currencies);
  const newJson = JSON.stringify(currencies);
  await fs.writeFile('./currencies.json', newJson);
});
