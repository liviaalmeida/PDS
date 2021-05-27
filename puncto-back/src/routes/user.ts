import express from 'express'
import { Request, Response } from 'express'
import { Connection, createConnection } from "typeorm";
import { UserRepository } from '../repository/userRepository'
import { UserDto } from '../dto/userDto';

const router = express.Router()

router.post('/user', async (req: Request, res: Response) => {
    try {
        let user = req.body as UserDto
        const connection: Connection = await createConnection()
        const userRepository = new UserRepository(connection)
        await userRepository.createUser(user.firstName, user.lastName, user.age)
        await connection.close()
        res.status(200).json("Endpoint de login")
    } catch (exception) {

    }
})


router.get('/user', async (req: Request, res: Response) => {
    try {
        const connection: Connection = await createConnection()
        const userRepository = new UserRepository(connection)
        const allUsers = await userRepository.findAllUsers()
        await connection.close()
        res.status(200).json(allUsers)

    } catch (exception) {

    }
})
export default router
