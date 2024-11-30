require('dotenv').config();
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Middleware function for verifying JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN as string, (err) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    next();
  });
};
