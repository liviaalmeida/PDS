import express from 'express'
import { Request, Response } from 'express'
import { Connection, createConnection } from "typeorm";
import { UserRepository } from '../repository/userRepository'
import { UserDto } from '../dto/userDto';
import { UserService } from '../service/userService';

const router = express.Router()

router.post('/user', async (req: Request, res: Response) => {
    try {
        let user = req.body as UserDto
        const userService = new UserService()
        await userService.createUser(user)
        res.status(200).json("Fon")
    } catch (exception) {

    }
})


router.get('/user', async (req: Request, res: Response) => {
    try {
        const userService = new UserService()
        const allUsers = await userService.findAllUsers()
        res.status(200).json(allUsers)

    } catch (exception) {

    }
})
export default router
