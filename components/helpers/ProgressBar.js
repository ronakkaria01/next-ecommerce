"use client"
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'

export default function ProgressBar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    NProgress.configure({ showSpinner: false })
    
    useEffect(() => {
        NProgress.start()
    }, [])

    useEffect(() => {
        NProgress.start()
    }, [pathname]);

    useEffect(() => {
        NProgress.done()
    }, [searchParams]);
}