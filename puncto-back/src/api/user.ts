import express from 'express';
import { Request, Response } from 'express';
import { Logger } from 'tslog';

import { UserDto } from '../dto/userDto';
import { LoginDto } from '../dto/loginDto';
import { UserService } from '../service/userService';
import { AuthService } from '../service/authService';
import { container } from '../inversify.config';

const log: Logger = new Logger();

const router = express.Router();

// @TODO validar payload
// @TODO validar email unico antes de cadastrar
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const user = req.body as UserDto;
    const userService = container.get(UserService);
    const authService = container.get(AuthService);

    await userService.createUser(user);

    const authToken = authService.generateToken(user.email);

    res.status(201).json({
        authToken
    });
  } catch (err) {
    log.error('Error signing up: ', err);
    res.status(err.statusCode).json();
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const credentials = req.body as LoginDto;

    const userService = container.get(UserService);
    const authService = container.get(AuthService);
    const user = await userService.findByEmail(credentials.email);

    authService.authenticate(credentials, user.password);
    const authToken = authService.generateToken(credentials.email);    

    res.status(200).json({
      authToken,
    });
  } catch (err) {
    log.warn('Error logging in up: ', err);
    res.status(err.statusCode).json();
  }
});

router.get('/user', async (req: Request, res: Response) => {
  try {
    const userService = container.get(UserService);
    const allUsers = await userService.findAllUsers();
    res.status(200).json(allUsers);
  } catch (exception) {}
});

export default router;
