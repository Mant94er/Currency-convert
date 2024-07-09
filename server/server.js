import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import { dirname } from 'path';
import { authenticateUser, verifyToken } from './auth/index.js';
import { readAccounts, writeAccounts } from './database/accounts/accounts.js';
import {
  readCurrencies,
  writeCurrencies,
} from './database/currencies/currencies.js';

const app = express();
const port = 1994;
const __dirname = dirname(process.cwd());

app.use(express.static('../dist'));
app.use(express.json());
app.use(cookieParser());

// Read currencies
app.get('/currencies', async (req, res) => {
  const currencies = await readCurrencies();
  res.json(currencies);
});

// Edit, Add currencies
app.post('/currencies', verifyToken, async (req, res) => {
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

// Delete currencies
app.post('/removals', verifyToken, async (req, res) => {
  const currencies = await readCurrencies();
  const oldCoin = currencies.find((coin) => coin.name === req.body.name);
  const newCur = currencies.filter((coin) => coin !== oldCoin);
  res.json(newCur);
  await writeCurrencies(newCur);
});

// Create new user
app.post('/register', async (req, res) => {
  const accounts = await readAccounts();
  const users = accounts.map((user) => user.user);
  if (users.includes(req.body.user)) {
    res
      .status(404)
      .json({ error: 'Username already occupied! Try a different one' });
    return;
  }
  const password = req.body.password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      const newUser = { user: req.body.user, password: hash };
      accounts.push(newUser);

      writeAccounts(accounts);
      res.json({ success: true });
    });
  });
});

// Login user
app.post('/login', async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }
  const loggingUser = await authenticateUser(user, password);

  if (loggingUser) {
    // Generate JWT token
    const token = jwt.sign(
      { userId: loggingUser.user },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res.cookie('id', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3hours
    });
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'User not found! Try again' });
  }
});

app.get('/auth', verifyToken, (req, res) => {
  return res.json(req.user);
});

app.post('/logout', verifyToken, (req, res) => {
  return res.clearCookie('id').json({ logout: true });
});

// Rewrite rule for SPA
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
