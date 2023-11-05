import NextLink from "../helpers/nextlink";
import ProgressBar from "../helpers/ProgressBar";
import NavBar from "./navbar";

export default async function Header() {
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