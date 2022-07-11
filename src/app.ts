import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()
import config from "config"
import router from "./router/index.route"

const port = config.get<number>("port")
const app = express()

app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
