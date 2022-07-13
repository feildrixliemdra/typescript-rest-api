import { number, object, string, TypeOf } from "zod"
export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "first_name is required",
    }),
    lastName: string(),
    age: number(),
    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
    password: string({
      required_error: "password is required",
    }),
    passwordConfirmation: string({
      required_error: "confirm_password is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password not match",
    path: ["passwordConfirmation"],
  }),
})

export type CreateUserPayload = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>
