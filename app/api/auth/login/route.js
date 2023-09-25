import { getUserByEmail } from "../../../../models/users.model"
import { defaultResponse as response, sendResponse, validateData } from "@/utils/defaults";
import { emailSchema, passwordSchema } from "@/utils/schemas"
import bcrypt from "bcrypt"

export async function POST(req, res) {

    const { email, password } = await req.json()

    const validationErrors = validateData({ email, password }, {
        email: emailSchema,
        password: passwordSchema
    })

    if (Object.keys(validationErrors).length !== 0) {
        response.status = 400
        response.errors = validationErrors
        return sendResponse(response)
    }

    try {
        const user = await getUserByEmail(email)
        if (user) {
            const passwordVerified = await bcrypt.compare(password, user.password)
            if (passwordVerified) {
                delete user.password
                response.data.user = user
                return sendResponse(response)
            }
        }

        response.status = 401
        response.message = "Email or password is wrong"

    } catch (err) {
        console.log(err)
    } finally {
        return sendResponse(response)
    }
}