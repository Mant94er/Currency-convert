import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByName } from '../database/accounts/accounts.js';

export const authenticateUser = async (name, password) => {
  const user = await getUserByName(name);
  if (!user) return null;

  const passwordMatch = bcrypt.compareSync(password, user.password);
  return passwordMatch ? user : null;
};

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.id;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = { user: decodedToken.userId };
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
