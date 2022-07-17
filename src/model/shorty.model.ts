import mongoose from "mongoose"
import { UserDocument } from "./user.model"
import { customAlphabet } from "nanoid"

const nanoID = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
)
//model interface
export interface ShortyDocument extends mongoose.Document {
  user: UserDocument["_id"]
  url: string
  shorten_url: string
  count: number
  expiredAt: Date
  createdAt: Date
  updatedAt: Date
}

//mongoose schema
const shortySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    url: { type: String, required: true },
    shorten_url: { type: String, default: () => nanoID() },
    count: { type: Number, required: true, default: 0 },
    expiredAt: { type: Date, required: true, default: setExpiredDate() },
  },
  { timestamps: true }
)

shortySchema.index(
  {
    shorten_url: 1,
    user: 1,
  },
  { unique: true }
)
const ShortyModel = mongoose.model<ShortyDocument>("Shorty", shortySchema)

export default ShortyModel

function setExpiredDate() {
  const now = new Date()
  return now.setDate(now.getDate() + 30)
}
