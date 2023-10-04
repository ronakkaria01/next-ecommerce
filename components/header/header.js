import LogoutButton from "../button/Logout";
import NextLink from "../helpers/nextlink";
import ProgressBar from "../helpers/ProgressBar";
import { authOptions } from '../../app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

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
                <nav className="flex justify-between items-center py-4 container">
                    <div>
                        <NextLink href="/" text="Next E-commerce" />
                    </div>
                    <div>
                        <ul className="flex space-x-4">
                            {navLinks.map(([title, url], key) => (
                                <li key={key}>
                                    <NextLink href={url} className="rounded px-3 py-2 block hover:bg-slate-500 hover:text-white" activeClassName="bg-slate-500 text-white" text={title} />
                                </li>
                            ))}
                            {session?.user ? (
                                <>
                                    <li>
                                        <LogoutButton />
                                    </li>
                                </>
                            ) : ""}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}