import mongoose from "mongoose"
import config from "config"
import log from "./logger"

async function connect() {
  const dbURL = config.get<string>("dbURL")

  try {
    await mongoose.connect(dbURL)
    log.info(`success connect to database at ${dbURL}`)
  } catch (e) {
    log.error("error connect to db " + e)
    process.exit(1)
  }
}

export default connect
