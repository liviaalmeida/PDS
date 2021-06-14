import 'reflect-metadata';

import { injectable } from 'inversify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LoginDto } from '../dto/loginDto';
import { auth } from '../config';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

export type AuthInfo = {
  userEmail: string;
  iat: number;
  exp: number;
}

@injectable()
export class AuthService {
  authenticate(credentials: LoginDto, passwordHash: string): void {
    const authenticated = bcrypt.compareSync(credentials.password, passwordHash);

    if (!authenticated) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  generateToken(email: string): string {
    const token = jwt.sign({ userEmail: email }, auth.secret, { expiresIn: auth.expires });
    return token;
  }

  verifyToken(jwtToken: string): AuthInfo {
    try {
      return jwt.verify(jwtToken, auth.secret) as AuthInfo;
    } catch (error) {
      throw new UnauthorizedException('Invalid auth token');
    }
  }
}
