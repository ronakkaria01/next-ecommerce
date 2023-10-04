"use client"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import nProgress from "nprogress"

export default function LoginSignup() {
    const router = useRouter()

    const login = async (e) => {
        e.preventDefault()
        nProgress.start()
        const formData = new FormData(e.target)
        const email = formData.get('email')
        const password = formData.get('password')
        const result = await signIn('credentials', { email, password, redirect: false })

        if (result.error) {
            // console.log(JSON.parse(result.error))
            nProgress.done()
        } else {
            router.push('/')
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
            // console.log(JSON.parse(result.error))
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