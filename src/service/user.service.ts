import { omit } from "lodash"
import { DocumentDefinition } from "mongoose"

import UserModel, { UserDocument } from "../model/user.model"
import log from "../util/logger"
export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    return await UserModel.create(input)
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function getUsers() {
  try {
    const user = await UserModel.find()
    const result = []
    user.forEach((e) => {
      const obj = omit(e.toJSON(), [
        "password",
        "createdAt",
        "updatedAt",
        "__v",
      ])
      result.push(obj)
    })

    return result
  } catch (e: any) {
    throw new Error(e)
  }
}
