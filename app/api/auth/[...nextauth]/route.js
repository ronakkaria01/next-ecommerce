import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { validateData } from "@/lib/defaults"
import { emailSchema, passwordSchema } from "@/lib/schemas"
import bcrypt from "bcrypt"
import { models } from '@/db/models/index'

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

                    const user = await models.users.findOne({
                        where: { email: credentials.email }
                    })
                    if (user) {
                        const passwordVerified = await bcrypt.compare(credentials.password, user.password)
                        if (passwordVerified) {
                            const returnUser = user.toJSON()
                            delete returnUser.password
                            return returnUser
                        } else {
                            throw {
                                message: "Incorrect email or password",
                                validationErrors: null
                            }
                        }
                    } else {
                        const hashedPassword = await bcrypt.hash(credentials.password, 10)
                        const inserted = await models.users.create({
                            email: credentials.email,
                            password: hashedPassword
                        })
                        const insertId = inserted.id
                        const createdUser = await models.users.findOne({
                            where: {
                                id: insertId
                            },
                            attributes: {
                                exclude: ['password']
                            }
                        })
                        return createdUser.toJSON()
                    }

                } catch (err) {
                    throw new Error(JSON.stringify(err))
                }
            },
        }),
    ],
    pages: {
        signIn: "/account",
        newUser: "/account"
    },
    callbacks: {
        async jwt({ token, user }) {
            return {
                ...token,
                ...user
            }
        },

        async session({ session, token, user }) {
            session.user = token
            return session
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