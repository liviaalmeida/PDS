import loginRouter from './routes/login'
const express = require('express')
const app = express()
const port = 3000

app.use(loginRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})