import express from 'express'
import { Request, Response } from 'express'
import { UserDto } from '../dto/userDto';
import { UserService } from '../service/userService';
import { container } from '../inversify.config';

const router = express.Router()

router.post('/user', async (req: Request, res: Response) => {
    try {
        let user = req.body as UserDto
        const userService = container.get(UserService)
        await userService.createUser(user)
        res.status(200).json("Fon")
    } catch (exception) {

    }
})


router.get('/user', async (req: Request, res: Response) => {
    try {
        const userService = container.get(UserService)
        const allUsers = await userService.findAllUsers()
        res.status(200).json(allUsers)

    } catch (exception) {

    }
})
export default router
