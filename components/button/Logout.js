"use client"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return (
        <button className="rounded px-3 py-2 block hover:bg-slate-500 hover:text-white" onClick={(e) => signOut()}>Logout</button>
    )
}