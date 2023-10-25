import { addUserMeta, getUserMeta, updateUserMeta } from "@/db/controller/users.controller";
import { models } from "@/db/models"
import { defaultResponse as response, sendResponse } from "@/utils/defaults";

export async function GET(req, { params }, res) {
    const { id } = params
    if (!id) {
        response.message = "You need to pass an id"
        response.error = "You need to pass an id"
        response.status = 404
        return sendResponse(response)
    }
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

export async function PATCH(req, { params }, res) {
    try {
        const { id } = params
        if (!id) {
            response.message = "You need to pass an id"
            response.error = "You need to pass an id"
            response.status = 404
            return sendResponse(response)
        }

        const { fields, meta_data } = await req.json()

        const user = await models.users.findOne({
            where: { id: id },
            include: [
                {
                    model: models.user_meta,
                    attributes: ['meta_key', 'meta_value'],
                }
            ],
            attributes: { exclude: ["password"] }
        })
        if (user) {
            for (const field in fields) {
                user[field] = fields[field]
            }
            for (const meta_key in meta_data) {
                const data = await getUserMeta(meta_key, id)
                if (data) {
                    if (data != meta_data[meta_key]) {
                        await updateUserMeta(id, meta_key, meta_data[meta_key])
                    }
                } else {
                    await addUserMeta(id, meta_key, meta_data[meta_key])
                }
            }
            await user.save()
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
    } catch (err) {
        console.log(err)
    }
}