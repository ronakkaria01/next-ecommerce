import AddToCart from "@/components/button/AddToCart";
import Header from "@/components/header/header";
import CreateProducts from "@/components/helpers/CreateProducts";
import CurrencyDisplay from "@/components/helpers/CurrencyDisplay";
import Image from "next/image";
import { getShopProducts } from "@/db/controller/posts.controller";

export const products = [
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

export default async function Shop() {
    let shop = []
    try {
        shop = await getShopProducts()
    } catch (err) {
        console.log(err)
    }
    return (
        <>
            <Header />
            {/* <CreateProducts /> */}
            <div className="py-16 container">
                <div className="flex flex-wrap gap-y-4">
                    {shop.map((item, index) => {
                        return (
                            <div key={index} className="w-1/3 px-2">
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
                    })}
                </div>
            </div>
        </>
    )
}