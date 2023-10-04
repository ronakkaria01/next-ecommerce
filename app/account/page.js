import Header from "@/components/header/header";
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LoginSignup from "@/components/content/accountForm";

export default async function Account() {
    const session = await getServerSession(authOptions)
    return (
        <>
            <Header />
            {session?.user ? (
                ""
            ) : (
                <>
                    <LoginSignup />
                </>
            )}
        </>
    )
}