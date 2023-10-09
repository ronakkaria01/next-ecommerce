import { cleanPosts } from "@/utils/functions"
import { models } from "../models"

async function getShopProducts() {
    let shop = await models.posts.findAll({
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
    return shop
}

export {
    getShopProducts
}