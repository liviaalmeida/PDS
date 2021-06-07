import "reflect-metadata";

import { injectable } from "inversify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { LoginDto } from "../dto/loginDto";
import { auth } from "../config";

@injectable()
export class AuthService {
    async authenticate(credentials: LoginDto, passwordHash: string): Promise<string> {
        const verified = bcrypt.compareSync(credentials.password, passwordHash);
        if (verified) {
            return jwt.sign({ userEmail: credentials.email }, auth.secret, { expiresIn: '7d' });
        }
        return '';
    }
}

