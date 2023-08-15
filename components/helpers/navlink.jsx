"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation'

/**
 * Custom NavLink component for Next.js.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.href - The URL to navigate to.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {string} props.text - The text to display for the link.
 */
export default function NavLink(props) {
    const {
        href = "/",
        className,
        text = "Link",
    } = props;

    const pathname = usePathname()

    const isActive = pathname === href;
    const activeClassName = isActive ? `${className} bg-slate-500 text-white` : className;

    return (
        <Link href={href} className={activeClassName}>{text}</Link>
    )
}