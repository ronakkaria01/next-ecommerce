import { getUserByEmail, createUser } from "../../../../models/users.model"
import { defaultResponse as response, sendResponse, validateData } from "@/utils/defaults";
import { emailSchema, passwordSchema } from "@/utils/schemas"

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

        if (!user) {
            const userId = await createUser(email, password)
            response.message = "User Registered Successfully"
            response.data = {
                userId
            }
        } else {
            response.status = 409
            response.message = "Email already taken"
        }

    } catch (err) {
        console.log(err)
    }

    return sendResponse(response)
}