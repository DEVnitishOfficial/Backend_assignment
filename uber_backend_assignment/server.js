
import express from 'express'
import { serverConfig } from './config/index.js'
import connectToDB from './config/dbConnection.js'


const app = express()


app.get('/', (req, res) => {
    res.send("this is home page")
})


app.listen(serverConfig.PORT, async() => {
    await connectToDB();
    console.log(`server is listening at port ${serverConfig.PORT}`)
})