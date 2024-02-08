import zod from "zod";

export const signupBody = zod.object({
    username: zod.string().email(),
    first_name: zod.string().min(6),
    last_name: zod.string().min(6),
    password: zod.string().min(6)
}).strict()

export const signInHeader = zod.object({
    authorization: zod.string()
})

export const updateUserBody = zod.object({
    first_name: zod.string().min(6),
    last_name: zod.string().min(6),
    password: zod.string().min(6),
    username: zod.string().email()
}).strict()
