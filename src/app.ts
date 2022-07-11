import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()
import config from "config"

const port = config.get<number>("port")
const app = express()

app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({ message_info: "healthy" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
