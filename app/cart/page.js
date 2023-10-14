import CartTable from "@/components/cart/CartTable";
import Header from "@/components/header/header";
import { OrderSummary } from "@/components/order-summary/OrderSummary";

export const revalidate = 'force-cache'

export default async function Cart() {
    return (
        <>
            <Header />
            <div className="py-16 container">
                <div className="flex -ml-3">
                    <div className="w-2/3 px-3">
                        <CartTable />
                    </div>
                    <div className="w-1/3 px-3">
                        <OrderSummary />
                    </div>
                </div>
            </div >
        </>
    )
}