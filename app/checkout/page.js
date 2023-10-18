import Header from "@/components/header/header"
import { generateCartSummary } from "@/utils/functions"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const revalidate = 'force-cache'

export default async function Checkout() {
    const session = await getServerSession(authOptions)
    const headerList = headers()
    const cbUrl = headerList.get('x-url')
    if (!session?.user) {
        redirect(`/account?callbackUrl=${encodeURIComponent(cbUrl)}`)
    }
    const cart = await generateCartSummary()
    return (
        <>
            <Header />
        </>
    )
}