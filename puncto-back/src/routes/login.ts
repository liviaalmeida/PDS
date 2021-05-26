import express from 'express'
import { Request, Response } from 'express'

const  router = express.Router()

router.get('/login', (req: Request, res: Response) => {
    try {
        res.status(200).json("Exemplo de rota")
    } catch (exception) {

    }
})

export default router
