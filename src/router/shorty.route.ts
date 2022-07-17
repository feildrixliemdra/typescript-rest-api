import express from "express"
import {
  createShortyHandler,
  getShortyURLHandler,
} from "../controller/shorty.controller"
import validate from "../middleware/validateParam"
import { createShortySchema } from "../schema/shorty.schema"

const router = express.Router()

router.post("/api/shorty", validate(createShortySchema), createShortyHandler)
router.get("/api/shorty/:url", getShortyURLHandler)
export default router
