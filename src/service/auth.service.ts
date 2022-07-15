import { get } from "lodash"
import { FilterQuery, UpdateQuery } from "mongoose"
import SessionModel, { SessionDocument } from "../model/auth.model"
import { signJWT, verifyJWT } from "../util/jwt"
import { getUser } from "./user.service"
import config from "config"

export async function createSession(userID: string, userAgent: string) {
  const session = await SessionModel.create({ user: userID, userAgent })
  return session.toJSON()
}

export async function getSession(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean()
}

export async function deleteSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string
}) {
  const { decoded } = verifyJWT(refreshToken)

  if (!decoded || !get(decoded, "session")) return false
  const session = await SessionModel.findById(get(decoded, "session"))

  if (!session || !session.valid) return false

  const user = await getUser({ _id: session.user })

  if (!user) return false

  //create access token
  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: config.get<string>("tokenTTL") }
  )

  return accessToken
}
