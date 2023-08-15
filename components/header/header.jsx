"use client"
import Link from "next/link";
import NavLink from "../helpers/navlink";

export default function Header() {

    const navLinks = [
        ['Home', '/'],
        ['Shop', '/shop'],
        ['Account', '/account']
    ];

    return (
        <header className="bg-slate-100">
            <nav className="flex justify-between items-center px-12 py-4">
                <div>
                    <Link href="/">Next E-commerce</Link>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        {navLinks.map(([title, url], key) => (
                            <li key={key}>
                                <NavLink href={url} className="rounded px-3 py-2 block hover:bg-slate-500 hover:text-white" text={title} />
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}