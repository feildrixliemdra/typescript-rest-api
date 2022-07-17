import config from "config"
import { Request, Response } from "express"
import { createShorty, getShorty } from "../service/shorty.service"
import { ResponseBody } from "../schema/response.schema"
import { omit } from "lodash"
export async function createShortyHandler(req: Request, res: Response) {
  try {
    const shorty = await createShorty(req.body)

    res.send(omit(shorty, ["createdAt", "updatedAt", "__v", "_id", "count"]))
  } catch (e: any) {
    res.status(409).json({ success: false, message: e.message })
  }
}

export async function getShortyURLHandler(req: Request, res: Response) {
  try {
    const shorty = await getShorty({ shorten_url: req.params["url"] })
    if (shorty && shorty.expiredAt >= new Date()) {
      return res.redirect(shorty.url)
    }

    const resp: ResponseBody = {
      message: "url data not found",
      success: false,
    }

    res.status(400).json(resp)
  } catch (e: any) {
    res.status(409).json({ success: false, message: e.message })
  }
}
