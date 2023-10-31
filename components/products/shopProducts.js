import { getShopProducts } from "@/db/controller/posts.controller"
import Image from "next/image"
import CurrencyDisplay from "../helpers/CurrencyDisplay"
import AddToCart from "../button/AddToCart"

export default async function ShopProducts() {
    let shop = []
    try {
        shop = await getShopProducts()
    } catch (err) {
        console.log(err)
    }
    return (
        <>
            {/* <CreateProducts /> */}
            <div className="py-16 container">
                <div className="flex flex-wrap gap-y-4 -ml-2">
                    {shop.map((item, index) => {
                        return (
                            <ProductItem key={index} item={item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

function ProductItem({ item }) {
    return (
        <div className="md:w-1/2 lg:w-1/3 px-2">
            <div className="border rounded-2xl overflow-hidden hover:shadow-md">
                <div className="border-b">
                    <Image src={item.thumbnail} alt={item.post_title} width={500} height={500} />
                </div>
                <div className="p-4">
                    <p>{item.post_title}</p>
                    <p className="mt-2">{item.post_content}</p>
                    <p className="mt-2">
                        <span className="line-through">
                            <CurrencyDisplay price={item.regular_price} />
                        </span>
                        {" "}
                        <span>
                            <CurrencyDisplay price={item.discount_price} />
                        </span>
                    </p>
                    <AddToCart product_id={item.id} />
                </div>
            </div>
        </div>
    )
}