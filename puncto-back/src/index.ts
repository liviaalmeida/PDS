import { createConnection } from 'typeorm';
import userRouter from './api/user'
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.use(userRouter)

app.listen(port, async () => {
    await createConnection()
    console.log(`Example app listening at http://localhost:${port}`)
})