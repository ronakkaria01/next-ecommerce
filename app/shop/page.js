import AddToCart from "@/components/button/AddToCart";
import Header from "@/components/header/header";
import CreateProducts from "@/components/helpers/CreateProducts";
import CurrencyDisplay from "@/components/helpers/CurrencyDisplay";
import Image from "next/image";
import { getShopProducts } from "@/db/controller/posts.controller";

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
                <div className="flex flex-wrap gap-y-4 -ml-2">
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