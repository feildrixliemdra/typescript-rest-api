import express from "express"

const router = express.Router()

router.get("/api/auth", (req, res) => {
  res.json({ message_info: "healthy" })
})

export default router
