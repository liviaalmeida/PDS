import 'reflect-metadata';

import { injectable } from 'inversify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LoginDto } from '../dto/loginDto';
import { auth } from '../config';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

@injectable()
export class AuthService {
  authenticate(credentials: LoginDto, passwordHash: string): void {
    const authenticated = bcrypt.compareSync(credentials.password, passwordHash);

    if (!authenticated) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  generateToken(email: string): string {
    return jwt.sign({ userEmail: email }, auth.secret, { expiresIn: '7d' });
  }
}
