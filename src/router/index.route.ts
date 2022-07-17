import express from "express"
import deserializeUser from "../middleware/deserializeUser"
import auth from "./auth.route"
import user from "./user.route"
import shorty from "./shorty.route"
const router = express.Router()

router.get("/api/health", (req, res) => {
  res.json({ message_info: "healthy" })
})
router.use(deserializeUser)

//wiring auth route
router.use(auth)

//wiring user route
router.use(user)

//wiring shorty route
router.use(shorty)

export default router
