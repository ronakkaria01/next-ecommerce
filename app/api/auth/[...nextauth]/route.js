import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { validateData } from "@/utils/defaults"
import { emailSchema, passwordSchema } from "@/utils/schemas"
import bcrypt from "bcrypt"
import db from '@/db/models/index'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const validationErrors = validateData({
                        email: credentials.email,
                        password: credentials.password
                    }, {
                        email: emailSchema,
                        password: passwordSchema
                    })
                    if (Object.keys(validationErrors).length !== 0) {
                        throw {
                            message: "Validation Errors Found",
                            validationErrors: validationErrors
                        }
                    }

                    const user = await db.users.findOne({
                        where: { email: credentials.email }
                    })
                    if (user) {
                        const passwordVerified = await bcrypt.compare(credentials.password, user.password)
                        if (passwordVerified) {
                            return {
                                id: user.u_id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                user_name: user.user_name,
                                email: user.email,
                            }
                        } else {
                            throw {
                                message: "Incorrect email or password",
                                validationErrors: null
                            }
                        }
                    } else {
                        const hashedPassword = await bcrypt.hash(credentials.password, 10)
                        const inserted = await db.users.create({
                            email: credentials.email,
                            password: hashedPassword
                        })
                        const insertId = inserted.u_id
                        const createdUser = await db.users.findOne({
                            where: {
                                u_id: insertId
                            },
                            attributes: {
                                exclude: ['password']
                            }
                        })
                        return {
                            id: createdUser.u_id,
                            first_name: createdUser.first_name,
                            last_name: createdUser.last_name,
                            user_name: createdUser.user_name,
                            email: createdUser.email,
                        }
                    }

                } catch (err) {
                    throw new Error(JSON.stringify(err))
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    user_name: user.user_name,
                }
            } else {
                return token
            }
        },

        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    first_name: token.first_name,
                    last_name: token.last_name,
                    user_name: token.user_name,
                }
            }
        }
    },
    secret: process.env.JWT_SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60
    },
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }