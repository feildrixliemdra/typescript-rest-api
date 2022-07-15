import express from "express"
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "../controller/auth.controller"
import deserializeUser from "../middleware/deserializeUser"
import userLogin from "../middleware/login"
import validate from "../middleware/validateParam"
import { createSessionSchema } from "../schema/session.schema"
const router = express.Router()

router.post(
  "/api/sessions",
  validate(createSessionSchema),
  createUserSessionHandler
)

router.get("/api/sessions", userLogin, getUserSessionHandler)
router.delete("/api/sessions", userLogin, deleteSessionHandler)

export default router
