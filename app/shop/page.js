import Header from "@/components/header/header";
import ShopProducts from "@/components/products/shopProducts";
import { Suspense } from "react";

export default async function Shop() {
    return (
        <>
            <Header />
            <Suspense fallback={`Loading...`}>
                <ShopProducts />
            </Suspense>
        </>
    )
}