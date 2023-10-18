import CartTable from "@/components/cart/CartTable";
import { EmptyCart } from "@/components/cart/EmptyCart";
import Header from "@/components/header/header";
import { OrderSummary } from "@/components/order-summary/OrderSummary";
import { generateCartSummary } from "@/utils/functions";

export const revalidate = 'force-cache'

export default async function Cart() {
    const cart = await generateCartSummary()
    return (
        <>
            <Header />
            <div className="py-16 container">
                {cart.items.length == 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="flex -ml-3">
                        <div className="w-2/3 px-3">
                            <CartTable cart={cart} />
                        </div>
                        <div className="w-1/3 px-3">
                            <OrderSummary cart={cart} />
                        </div>
                    </div >
                )}
            </div >
        </>
    )
}