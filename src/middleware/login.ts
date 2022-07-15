import { Request, Response, NextFunction } from "express"

export default function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user
  if (!user) {
    return res.status(401).json({ success: false, message: "invalid token" })
  }

  return next()
}
