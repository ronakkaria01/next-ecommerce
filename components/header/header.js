import LogoutButton from "../button/Logout";
import NextLink from "../helpers/nextlink";
import ProgressBar from "../helpers/ProgressBar";
import { authOptions } from '../../app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import NavBar from "./navbar";

export default async function Header() {
    const session = await getServerSession(authOptions)

    const navLinks = [
        ['Home', '/'],
        ['Shop', '/shop'],
        ['Cart', '/cart'],
        ['Account', '/account']
    ];

    return (
        <>
            <ProgressBar />
            <header className="bg-slate-100">
                <nav className="flex justify-between items-center py-3 container">
                    <NextLink href="/" text="Next E-commerce" />
                    <NavBar />
                </nav>
            </header>
        </>
    )
}