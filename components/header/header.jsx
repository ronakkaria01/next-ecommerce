"use client"
import NextLink from "../helpers/nextlink";
import ProgressBar from "../helpers/ProgressBar";
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Header() {
    const session = useSession()

    const navLinks = [
        ['Home', '/'],
        ['Shop', '/shop'],
        ['Account', '/account']
    ];

    return (
        <>
            <ProgressBar />
            <header className="bg-slate-100">
                <nav className="flex justify-between items-center px-12 py-4">
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
                            {session.data ? (
                                <>
                                    <li>
                                        <button className="rounded px-3 py-2 block hover:bg-slate-500 hover:text-white" onClick={(e) => signOut()}>Logout</button>
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