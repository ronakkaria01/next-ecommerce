import { products } from "@/app/shop/page";
import { convertToSlug } from "@/utils/functions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { models } from "@/db/models/"

export default async function CreateProducts() {
    const session = await getServerSession(authOptions)
    const user_id = session?.user.id

    const create = async () => {
        if (!user_id) {
            console.log("not logged in")
            return
        }
        products.map(async (product) => {
            const created = await models.posts.create({
                post_title: product.product_title,
                post_content: product.product_description,
                post_name: convertToSlug(product.product_title),
                post_author: parseInt(user_id),
                post_type: 'product'
            })
            await models.post_meta.bulkCreate([
                {
                    post_id: created.id,
                    meta_key: "thumbnail",
                    meta_value: `${product.product_thumbnail}`,
                }, {
                    post_id: created.id,
                    meta_key: "regular_price",
                    meta_value: `${product.product_regular_price}`
                }, {
                    post_id: created.id,
                    meta_key: "discount_price",
                    meta_value: `${product.product_discount_price}`
                }, {
                    post_id: created.id,
                    meta_key: "stock_quantity",
                    meta_value: `${product.product_stock_quantity}`
                }
            ])
        })
    }

    await create()

    return (
        <></>
    )
}