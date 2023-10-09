import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware"
import { appDefaults } from "@/utils/defaults"

export default withAuth(
    async function middleware(request) {
        if (!appDefaults.enableRealTimeUserCheck) return NextResponse.next()
        const homeURL = process.env.HOME_URL
        const token = await getToken({
            req: request,
            secret: process.env.JWT_SECRET,
        })
        if (token) {
            const id = token.id
            try {
                const response = await fetch(`${homeURL}/api/user/${id}`)
                if (!response.ok) {
                    const user = await response.json()
                    if (user.status == 404) {
                        const res = NextResponse.redirect(`${homeURL}/account`)
                        res.cookies.delete("next-auth.session-token")
                        return res
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        return NextResponse.next()

    }, {
    callbacks: {
        authorized: () => {
            return true
        },
    }
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}