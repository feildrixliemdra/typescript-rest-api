import { Request, Response, NextFunction } from "express"
import { get } from "lodash"
import { reIssueAccessToken } from "../service/auth.service"
import { verifyJWT } from "../util/jwt"

export default async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers
  const authorization = header.authorization?.split(" ")
  const refreshToken = req.header("x-refresh")

  if (typeof authorization === "undefined") {
    return next()
  }

  const token = authorization[1]
  const { decoded, expired } = verifyJWT(token)
  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  if (expired && refreshToken) {
    const newToken = await reIssueAccessToken({ refreshToken })

    if (newToken) {
      res.setHeader("x-access-token", newToken)
      const result = verifyJWT(newToken)

      res.locals.user = result.decoded
    }

    return next()
  }

  return next()
}
