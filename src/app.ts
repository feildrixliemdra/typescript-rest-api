import express from "express"
import dotenv from "dotenv"
dotenv.config()
import config from "config"
import router from "./router/index.route"
import log from "./util/logger"
import connect from "./util/mongodb"

const port = config.get<number>("port")
const app = express()

app.use(express.json())

app.use(router)

app.listen(port, async () => {
  await connect()
  log.info(`app listening on port ${port}`)
})
