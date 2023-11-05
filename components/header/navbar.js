"use client"

import NextLink from "../helpers/nextlink";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const navLinks = [
    ['Home', '/'],
    ['Shop', '/shop'],
    ['Cart', '/cart'],
    ['Account', '/account']
];

export default function NavBar() {
    return (
        <>
            <NavigationMenu className="max-lg:hidden">
                <NavigationMenuList>
                    {navLinks.map(([title, url], key) => (
                        <NavigationMenuItem key={key}>
                            <NextLink href={url} className="rounded px-3 py-2 block hover:bg-slate-500 hover:text-white" activeClassName="bg-slate-500 text-white" text={title} />
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <Sheet>
                <SheetTrigger className="lg:hidden">
                    <HamburgerMenuIcon className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent>
                    <ul className="list-none space-y-2 mt-6">
                        {navLinks.map(([title, url], key) => (
                            <li key={key}>
                                <NextLink href={url} className="rounded px-3 py-2 block hover:bg-slate-500 hover:text-white" activeClassName="bg-slate-500 text-white" text={title} />
                            </li>
                        ))}
                    </ul>
                </SheetContent>
            </Sheet>

        </>
    )
}