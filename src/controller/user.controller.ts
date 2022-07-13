import { Request, Response } from "express"
import { CreateUserPayload } from "../schema/user.schema"
import { createUser } from "../service/user.service"
import log from "../util/logger"

export async function createUserHandler(
  req: Request<{}, {}, CreateUserPayload["body"]>,
  res: Response
) {
  try {
    //call user service
    const user = await createUser(req.body)
    return res.status(200).json({ success: true, data: user })
  } catch (e: any) {
    log.error(e)
    return res.status(409).json({ error: e.message })
  }
}
