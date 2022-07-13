import express from "express"
import { createUserHandler } from "../controller/user.controller"
import validate from "../middleware/validateParam"
import { createUserSchema } from "../schema/user.schema"

const router = express.Router()

router.get("/api/user", (req, res) => {
  res.json({ message_info: "healthy" })
})

router.post("/api/users", validate(createUserSchema), createUserHandler)

export default router
