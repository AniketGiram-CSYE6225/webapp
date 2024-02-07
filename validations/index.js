import zod from "zod";

export const signupBody = zod.object({
    username: zod.string().email(),
    first_name: zod.string(),
    last_name: zod.string(),
    password: zod.string().min(6)
}).strict()

export const signInHeader = zod.object({
    authorization: zod.string()
})

export const updateUserBody = zod.object({
    first_name: zod.string(),
    last_name: zod.string(),
    password: zod.string().min(6),
    username: zod.string()
}).strict()
