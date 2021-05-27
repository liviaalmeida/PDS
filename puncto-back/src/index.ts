import loginRouter from './routes/login'
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from './entity/User';
const express = require('express')
const app = express()
const port = 3000

createConnection().then(async connection => {

    console.log("Inserting a new Student into the database..."); 
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await user.save();
    console.log("Saved a new user with id: " + user.firstName);

    console.log("Loading users from the database...");
    const stds = await connection.manager.find(User); 
    console.log("Loaded users: ", stds);

    console.log("TypeORM with MongoDB");
}).catch(error => console.log(error));

app.use(loginRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})