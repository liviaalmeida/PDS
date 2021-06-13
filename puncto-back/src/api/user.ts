import express from 'express';
import { Request, Response } from 'express';
import { UserDto } from '../dto/userDto';
import { LoginDto } from '../dto/loginDto';
import { UserService } from '../service/userService';
import { AuthService } from '../service/authService';
import { container } from '../inversify.config';

const router = express.Router();

// @TODO validar payload
// @TODO validar email unico antes de cadastrar
// @TODO validacao de erros
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const user = req.body as UserDto;
    const userService = container.get(UserService);
    await userService.createUser(user);
    res.status(201).json('Created');
  } catch (err) {
    console.log('Error signing up: ', err);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const credentials = req.body as LoginDto;

    const userService = container.get(UserService);
    const authService = container.get(AuthService);
    const user = await userService.findByEmail(credentials.email);

    const authToken = await authService.authenticate(credentials, user.password);

    // @TODO handle this more nicely
    if (!authToken) {
      res.status(401).json('Invalid Credentials');
    }

    res.status(200).json({
      authToken,
    });
  } catch (err) {
    console.log('Error signing up: ', err);
    res.status(500);
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
