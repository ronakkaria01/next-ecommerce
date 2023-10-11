import { convertToSlug } from "@/utils/functions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { models } from "@/db/models/"

export default async function CreateProducts() {
    const session = await getServerSession(authOptions)
    const user_id = session?.user.id

    const products = [
        {
            product_id: 1,
            product_title: 'Test Product 1',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            product_regular_price: 9.99,
            product_discount_price: 7.99,
            product_stock_quantity: 10,
            created_at: "",
            updated_at: "",
            product_thumbnail: "/images/prod.webp",
        },
        {
            product_id: 2,
            product_title: 'Test Product 2',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            product_regular_price: 10.99,
            product_discount_price: 8.99,
            product_stock_quantity: 11,
            created_at: "",
            updated_at: "",
            product_thumbnail: "/images/prod.webp",
        },
    ]

    const create = async () => {
        if (!user_id) {
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