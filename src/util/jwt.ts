import jwt from "jsonwebtoken"
import config from "config"

const privateKey = config.get<string>("privateKey")
const publicKey = config.get<string>("publicKey")

export function signJWT(data: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(data, privateKey, {
    ...(options && options), // check if option not undefine, if undefine spread to obj
    algorithm: "RS256",
  })
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey)

    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    }
  }
}
