import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-foodrush-key';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
  };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: UserRole };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Accès refusé : le rôle ${req.user?.role} n'est pas autorisé` 
      });
    }
    next();
  };
};