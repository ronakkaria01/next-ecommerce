import { z } from "zod"

const emailSchema = z.string().email()
const passwordSchema = z.string().min(8, {
    message: 'Password must be at least 8 characters long'
}).regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|;:',<>.?/~`-]).*$/, {
    message: 'Password must contain at least 1 capital letter and 1 special character'
})

module.exports = {
    emailSchema,
    passwordSchema
}