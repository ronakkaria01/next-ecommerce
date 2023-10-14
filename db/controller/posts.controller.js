import { cleanPosts } from "@/utils/functions"
import { models } from "@/db/models/index"
import { Op } from "sequelize"

export async function getShopProducts() {
    let shop = []
    try {
        shop = await models.posts.findAll({
            where: {
                post_type: 'product'
            },
            include: [
                {
                    model: models.post_meta,
                    attributes: ['meta_key', 'meta_value'],
                }
            ]
        })
        shop = cleanPosts(shop)
    } catch (err) {
        console.log(err)
    }
    return shop
}

export async function getPostsByIDs(ids) {
    let posts = []
    try {
        posts = await models.posts.findAll({
            where: {
                id: { [Op.in]: ids }
            },
            include: [
                {
                    model: models.post_meta,
                    attributes: ['meta_key', 'meta_value'],
                }
            ]
        })
        posts = cleanPosts(posts)
    } catch (err) {
        console.log(err)
    }
    return posts
}