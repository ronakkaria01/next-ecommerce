"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation'
import NProgress from "nprogress";

/**
 * Custom NavLink component for Next.js.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.href - The URL to navigate to.
 * @param {string} [props.className] - Optional CSS class for styling.
 * @param {string} [props.activeClassName] - Optional CSS class for active element.
 * @param {string} props.text - The text to display for the link.
 */
export default function NavLink({ href = '/', activeClassName = undefined, className = undefined, text = 'Link', ...props }) {
    const pathname = usePathname()
    const isActive = pathname === href;

    let mergedClassName = undefined;
    if (className || activeClassName) {
        mergedClassName = className ?? ""
        mergedClassName += isActive ? (activeClassName ? ` ${activeClassName}` : "") : ""
        mergedClassName.trim()
    }

    const showLoading = () => {
        !isActive ? NProgress.start() : null
    }

    return (
        <Link href={href} onClick={showLoading} className={mergedClassName} {...props}>{text}</Link>
    )
}