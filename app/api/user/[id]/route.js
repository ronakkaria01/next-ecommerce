import { models } from "@/db/models"
import { defaultResponse as response, sendResponse } from "@/utils/defaults";

export async function GET(req, { params }, res) {
    const { id } = params
    const user = await models.users.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] }
    })
    if (user) {
        response.message = "User Found"
        response.data = {
            user: user.toJSON(),
        }
        return sendResponse(response)
    } else {
        response.status = 404
        response.message = "User Not Found"
        response.error = "User Not Found"
        return sendResponse(response)
    }
}