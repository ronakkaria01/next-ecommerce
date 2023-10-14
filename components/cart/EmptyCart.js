import Button from "../button/Button";
import NavLink from "../helpers/nextlink";

export function EmptyCart() {
    return (
        <>
            <div className="text-center">
                <h1 className="text-5xl font-medium">Your Cart is Empty!</h1>
                <p className="mt-8 tracking-wide">Add products to your cart before you proceed to checkout</p>
                <NavLink href="/shop/" className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-8 inline-block" text="Return to shop" />
            </div>
        </>
    )
}