import { DocumentDefinition, FilterQuery } from "mongoose"
import ShortyModel, { ShortyDocument } from "../model/shorty.model"

export async function createShorty(
  data: DocumentDefinition<Omit<ShortyDocument, "created_at" | "updated_at">>
) {
  try {
    const shorty = await ShortyModel.create(data)
    return shorty.toJSON()
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function getShorty(query: FilterQuery<ShortyDocument>) {
  try {
    const shorty = await ShortyModel.findOne(query).lean()
    if (shorty && shorty.expiredAt >= new Date()) {
      await ShortyModel.updateOne(query, { count: shorty.count + 1 })
    }
    return shorty
  } catch (e: any) {
    throw new Error(e)
  }
}
