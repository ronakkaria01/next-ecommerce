import { cleanUser } from "@/lib/functions";
import { Sequelize, models } from "../models";
import { getAddressFields, getDefaultMetaFields } from "@/lib/utils";

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

export async function getUser(id, user_meta = {}) {
    const fixedMetaDetails = getDefaultMetaFields(user_meta)
    if (fixedMetaDetails.meta_fields.includes('address')) {
        fixedMetaDetails.meta_fields = fixedMetaDetails.meta_fields.filter(e => e !== 'address')
        const addressFields = getAddressFields()
        fixedMetaDetails.meta_fields.push(...addressFields)
    }
    let user = false
    try {
        user = await models.users.findOne({
            where: { id: id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: models.user_meta,
                    where: {
                        meta_key: {
                            [Sequelize.Op.in]: fixedMetaDetails.meta_fields
                        }
                    },
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