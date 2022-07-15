import express from "express"
import deserializeUser from "../middleware/deserializeUser"
import auth from "./auth.route"
import user from "./user.route"

const router = express.Router()

router.get("/api/health", (req, res) => {
  res.json({ message_info: "healthy" })
})
router.use(deserializeUser)

//wiring auth route
router.use(auth)

//wiring user route
router.use(user)

export default router
