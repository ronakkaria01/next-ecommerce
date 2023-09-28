import AddToCart from "@/components/button/AddToCart";
import Header from "@/components/header/header";
import CurrencyDisplay from "@/components/helpers/CurrencyDisplay";
import Image from "next/image";

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
    return (
        <>
            <Header />
            <div className="py-16 container">
                <div className="flex gap-4">
                    {products.map((item, index) => (
                        <div className="w-1/3 border rounded-2xl overflow-hidden hover:shadow-md" key={index}>
                            <div className="border-b">
                                <Image src={item.product_thumbnail} alt={item.product_title} width={500} height={500} />
                            </div>
                            <div className="p-4">
                                <p>{item.product_title}</p>
                                <p className="mt-2">{item.product_description}</p>
                                <p className="mt-2">
                                    <span className="line-through">
                                        <CurrencyDisplay price={item.product_regular_price} />
                                    </span>
                                    {" "}
                                    <span>
                                        <CurrencyDisplay price={item.product_discount_price} />
                                    </span>
                                </p>
                                <AddToCart product_id={item.product_id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}