import express from 'express';
import { Request, Response } from 'express';
import { Logger } from 'tslog';

import { UserDto } from '../dto/userDto';
import { LoginDto } from '../dto/loginDto';
import { UserService } from '../service/userService';
import { AuthService } from '../service/authService';
import { container } from '../inversify.config';
import { validate, validationError } from '../validation';

const log: Logger = new Logger();

const router = express.Router();
const authService = container.get(AuthService);
const userService = container.get(UserService);

// @TODO validar email unico antes de cadastrar
router.post('/signup', validate(UserDto), async (req: Request, res: Response) => {
  try {
    const user = req.body as UserDto;

    await userService.createUser(user);

    const authToken = authService.generateToken(user.email);

    res.status(201).json({
        authToken
    });
  } catch (err) {
    log.error('Error signing up: ', err);
    res.status(err.statusCode).json(err.message);
  }
});

router.post('/login', validate(LoginDto), async (req: Request, res: Response) => {
  try {
    const credentials = req.body as LoginDto;

    const user = await userService.findByEmail(credentials.email);

    authService.authenticate(credentials, user.password);
    const authToken = authService.generateToken(credentials.email);    

    res.status(200).json({
      authToken,
    });
  } catch (err) {
    log.warn('Error logging in up: ', err);
    res.status(err.statusCode).json(err.message);
  }
});

router.get('/user', async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.findAllUsers();
    res.status(200).json(allUsers);
  } catch (exception) {}
});

router.use(validationError);

export default router;
