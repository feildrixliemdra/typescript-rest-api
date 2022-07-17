import { omit } from "lodash"
import { DocumentDefinition, FilterQuery } from "mongoose"

import UserModel, { UserDocument } from "../model/user.model"
import log from "../util/logger"
export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input)

    return omit(user.toJSON(), "password")
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function getUsers() {
  try {
    const user = await UserModel.find()
    const result = <any>[]
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

export async function validatePassword({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = await UserModel.findOne({ email })

  if (!user) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if (!isValid) {
    return false
  }

  return omit(user.toJSON(), "password")
}

export async function getUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean()
}
