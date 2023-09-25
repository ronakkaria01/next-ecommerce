import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, getUserById } from "../../../../models/users.model"
import { validateData } from "@/utils/defaults";
import { emailSchema, passwordSchema } from "@/utils/schemas"
import bcrypt from "bcrypt"
import { createUser } from "@/models/users.model"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const validationErrors = validateData({
                    email: credentials.email,
                    password: credentials.password
                }, {
                    email: emailSchema,
                    password: passwordSchema
                })
                if (Object.keys(validationErrors).length !== 0) {
                    throw new Error(JSON.stringify({
                        message: "Validation Errors Found",
                        validationErrors: validationErrors
                    }))
                }

                try {
                    const user = await getUserByEmail(credentials.email)
                    if (user) {
                        const passwordVerified = await bcrypt.compare(credentials.password, user.password)
                        if (passwordVerified) {
                            return {
                                id: user.u_id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                email: user.email,
                            };
                        } else {
                            throw new Error(JSON.stringify({
                                message: "Incorrect email or password",
                            }))
                        }
                    } else {
                        const insertId = await createUser(credentials.email, credentials.password)
                        const createdUser = await getUserById(insertId)
                        return {
                            id: createdUser.u_id,
                            first_name: createdUser.first_name,
                            last_name: createdUser.last_name,
                            email: createdUser.email,
                        };
                    }

                } catch (err) {
                    throw err
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