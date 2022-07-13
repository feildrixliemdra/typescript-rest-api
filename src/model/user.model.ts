import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

//typescript model
export interface UserDocument extends mongoose.Document {
  email: string
  firstName: string
  lastName: string
  password: string
  age: number
  createdAt: Date
  updatedAt: Date
  comparePassword(pass: string): Promise<Boolean>
}

//mongo schema definition
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    age: { type: Number, required: true },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  let user = this as UserDocument
  if (!user.isModified("password")) {
    return next()
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash

  next()
})

userSchema.methods.comparePassword = async function (
  pass: string
): Promise<Boolean> {
  const user = this as UserDocument

  return bcrypt.compare(pass, user.password).catch((e) => false)
}

const UserModel = mongoose.model<UserDocument>("User", userSchema)

export default UserModel
