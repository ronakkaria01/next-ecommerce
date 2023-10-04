import RemoveFromCart from "@/components/button/RemoveFromCart";
import Header from "@/components/header/header";
import { cookies } from "next/headers"

export const revalidate = 'force-cache'

export default async function Cart() {
    const store = cookies()
    let cart = []
    if (store.has('cart')) {
        cart = JSON.parse(store.get('cart').value)
    }
    return (
        <>
            <Header />
            <div className="cart">
                {cart.map((item, index) => (
                    item && (
                        <div key={index} >
                            <p>ID: {item.product_id}</p>
                            <p>Quantity: {item.quantity}</p>
                            <RemoveFromCart product_id={item.product_id} />
                        </div>
                    )
                ))}
            </div >
        </>
    )
}