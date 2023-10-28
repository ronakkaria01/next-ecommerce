"use client"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import nProgress from "nprogress"
import { useState } from "react"
import AuthValidationErrors from "../errors/authValidationErrors"

export default function LoginSignup() {
    const router = useRouter()
    const [loginMessages, setLoginMessages] = useState({})
    const params = useSearchParams()
    const cbUrl = params.get("callbackUrl") || "/"

    const login = async (e) => {
        e.preventDefault()
        try {
            setLoginMessages({})
            nProgress.start()
            const formData = new FormData(e.target)
            const email = formData.get('email')
            const password = formData.get('password')
            const result = await signIn('credentials', { email, password, callbackUrl: cbUrl })
            if (result?.error) {
                const { validationErrors, message } = JSON.parse(result.error)
                setLoginMessages({
                    message: message,
                    validationErrors: validationErrors
                })
            }
        } catch (err) {
            setLoginMessages({
                message: "Some error occured, please try again",
                validationErrors: null
            })
        } finally {
            nProgress.done()
        }
    }

    const register = async (e) => {
        e.preventDefault()
        nProgress.start()
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const result = await signIn('credentials', { email, password, redirect: false })

        if (result.error) {
            const { validationErrors, message } = JSON.parse(result.error)
            setLoginMessages({
                message: message,
                validationErrors: validationErrors
            })
            nProgress.done()
        } else {
            router.push('/')
        }
    }

    return (
        <>
            <main className="p-16">
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <p>Login</p>
                        <form onSubmit={login}>
                            <div>
                                <input type="email" name="email" placeholder="Enter Email Address" required />
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="Enter Password" required />
                            </div>
                            <div>
                                <button>Login</button>
                            </div>
                            <AuthValidationErrors message={loginMessages.message} validationErrors={loginMessages.validationErrors} />
                        </form>
                    </div>
                    <div className="w-1/2">
                        <p>Register</p>
                        <form onSubmit={register}>
                            <div>
                                <input type="email" name="email" placeholder="Enter Email Address" required />
                            </div>
                            <div>
                                <input type="password" name="password" placeholder="Enter Password" required />
                            </div>
                            <div>
                                <button>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}