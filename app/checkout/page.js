import Header from "@/components/header/header"
import { generateCartSummary } from "@/utils/functions"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import CheckoutForm from "@/components/content/checkoutForm"
import { CheckoutSummary } from "@/components/checkout-summary/CheckoutSummary"
import { getUser } from "@/db/controller/users.controller"

export const revalidate = 'force-cache'

export default async function Checkout() {
    const session = await getServerSession(authOptions)
    const headerList = headers()
    const cbUrl = headerList.get('x-url')
    if (!session?.user) {
        redirect(`/account?callbackUrl=${encodeURIComponent(cbUrl)}`)
    }
    const cart = await generateCartSummary()
    const id = session.user.id
    const user = await getUser(id)
    return (
        <>
            <Header />
            <main className="py-16 container">
                <div className="flex gap-8">
                    <div className="w-2/3">
                        <CheckoutForm user={user} cart={cart} />
                    </div>
                    <div className="w-1/3">
                        <CheckoutSummary cart={cart} />
                    </div>
                </div>
            </main>
        </>
    )
}