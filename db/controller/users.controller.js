import { cleanUser } from "@/lib/functions";
import { models } from "../models";

export async function getUserMeta(key, id) {
    const user_meta = await models.user_meta.findOne({
        where: { user_id: id, meta_key: key },
        attributes: ['meta_value']
    })
    return user_meta?.toJSON().meta_value
}

export async function updateUserMeta(id, key, value) {
    const user_meta = await models.user_meta.update({ meta_value: value }, {
        where: { user_id: id, meta_key: key }
    })
    return user_meta
}

export async function addUserMeta(id, key, value) {
    const user_meta = await models.user_meta.create({
        user_id: id,
        meta_key: key,
        meta_value: value
    })
    return user_meta?.toJSON()
}

export async function getUser(id) {
    let user = false
    try {
        user = await models.users.findOne({
            where: { id: id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: models.user_meta,
                    attributes: ['meta_key', 'meta_value'],
                }
            ]
        })
        if (!user) {
            return false
        }
        user = cleanUser(user)
    } catch (err) {
        console.log(err)
    }
    return user
}