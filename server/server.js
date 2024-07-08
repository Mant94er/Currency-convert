import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import { dirname } from 'path';
import {
  readCurrencies,
  writeCurrencies,
} from './database/currencies/currencies.js';
import { readAccounts, writeAccounts } from './database/accounts/accounts.js';

const app = express();
const port = 1994;
const __dirname = dirname(process.cwd());

app.use(express.static('../dist'));
app.use(bodyParser.json());

app.get('/currencies', async (req, res) => {
  const currencies = await readCurrencies();
  res.json(currencies);
});
app.post('/currencies', async (req, res) => {
  const currencies = await readCurrencies();
  const coins = currencies.map((coin) => coin.name);
  if (coins.includes(req.body.name)) {
    const updatedCurrency = currencies.find(
      (cur) => cur.name === req.body.name
    );
    currencies.splice(currencies.indexOf(updatedCurrency), 1, req.body);
    res.json(currencies);
    writeCurrencies(currencies);
  } else {
    currencies.push(req.body);
    res.json(currencies);
    await writeCurrencies(currencies);
  }
});
app.post('/removals', async (req, res) => {
  const currencies = await readCurrencies();
  const oldCoin = currencies.find((coin) => coin.name === req.body.name);
  const newCur = currencies.filter((coin) => coin !== oldCoin);
  res.json(newCur);
  await writeCurrencies(newCur);
});
app.post('/accounts', async (req, res) => {
  const accounts = await readAccounts();
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
      res.cookie('id', JSON.stringify(newUser), {
        expires: new Date(Date.now() + 3600000),
        domain: 'http://localhost:1994',
        path: '/',
      });
      res.json(newUser);
      writeAccounts(accounts);
    });
  });
});
app.post('/account', async (req, res) => {
  const accounts = await readAccounts();
  const loggingUser = accounts.find((user) => user.user === req.body.user);
  if (!!loggingUser) {
    bcrypt.compare(req.body.password, loggingUser.password, (err, result) => {
      if (err) res.status(404);
      if (result) {
        res.cookie('id', JSON.stringify(loggingUser), {
          expires: new Date(Date.now() + 3600000),
          domain: 'http://localhost:1994',
          path: '/',
        });
        res.json(loggingUser);
      }
    });
  } else {
    res.status(404);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
