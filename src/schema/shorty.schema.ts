import { number, object, string, TypeOf } from "zod"

export const createShortySchema = object({
  body: object({
    url: string({ required_error: "url is required" }).url(
      "invalid url format"
    ),
    custom_url: string()
      .regex(
        RegExp(`/^[a-zA-Z0-9]+$/`),
        "must contain alphanumeric character only"
      )
      .min(3, "min length is 3 character")
      .max(50, "max length is 50 character")
      .optional(),
  }),
})
