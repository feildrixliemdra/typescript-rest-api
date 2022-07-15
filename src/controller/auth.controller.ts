import config from "config"
import { Request, Response } from "express"
import {
  createSession,
  deleteSession,
  getSession,
} from "../service/auth.service"
import { validatePassword } from "../service/user.service"
import { signJWT } from "../util/jwt"

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate user password
  const user = await validatePassword(req.body)

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "invalid email or password" })
  }
  //create a session
  const session = await createSession(user._id, req.get("user-agent") || "")
  //create access token
  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("tokenTTL") }
  )

  //create refresh token
  const refreshToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("refreshTokenTTL") }
  )

  //return access token and refresh token
  return res
    .status(200)
    .json({ access_token: accessToken, refresh_token: refreshToken })
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userID = res.locals.user._id
  const session = await getSession({ user: userID, valid: true })
  return res.send(session)
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionID = res.locals.user.session
  await deleteSession({ _id: sessionID }, { valid: true })

  return res.send({ access_token: null, refresh_token: null })
}
