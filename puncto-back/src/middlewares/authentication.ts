import { Request, Response, NextFunction } from 'express';

import { AuthInfo, AuthService } from '../service/authService'
import { container } from '../inversify.config';

const authService = container.get(AuthService);

// esse middleware decodifica o JWT recebido no header da requisicao e injeta
// o email do usuario no objeto Request
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    res.status(401).json('Missing authentication token');
  }

  // From `Bearer <token>` to `<token>`
  const bearerToken = req.headers.authorization?.split(' ')[1] || '';

  try {
    const authInfo: AuthInfo = authService.verifyToken(bearerToken);
    req.userEmail = authInfo.userEmail;
    next()
  } catch(error) {
    res.status(401).json('Invalid authentication token');
  }
}