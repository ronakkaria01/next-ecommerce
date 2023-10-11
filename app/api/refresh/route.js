import { models } from "@/db/models"
import { defaultResponse as response, sendResponse } from "@/utils/defaults"
import { generateTokens } from "@/utils/functions"
import jwt from "jsonwebtoken"

export async function POST(req, res) {
    const { refreshToken } = await req.json()
    const { id } = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = await models.users.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['password']
        }
    })
    const tokens = generateTokens(user.toJSON())
    response.data = tokens
    return sendResponse(response)
}