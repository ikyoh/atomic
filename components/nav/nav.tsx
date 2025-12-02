'use client';
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import useScrollListener from "@/hooks/useScrollListener";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "./mobile-nav";

import { usePathname } from 'next/navigation';



const Nav = ({ className, children, id }: NavProps) => {

    const currentPath = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const scroll = useScrollListener();

    // update classList of nav on scroll
    useEffect(() => {
        if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
            setIsVisible(false);
        else setIsVisible(true);

    }, [scroll.y, scroll.lastY]);

    return (
        <nav
            className={`z-50 bg-background backdrop-blur-sm sticky top-0 border-b transition-all duration-300 ${!isVisible && "-translate-y-full"} `}
            id={id}
        >
            <div
                id="nav-container"
                className="max-w-7xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
            >
                <Link
                    className="hover:opacity-75 transition-all flex gap-4 items-center"
                    href="/"
                >
                    <Logo />
                </Link>
                {children}
                <div className="flex items-center gap-2">
                    <Button asChild variant={"secondary"} className="hidden :flex">
                        <Link href="/contact" className="uppercase">Contact</Link>
                    </Button>
                    <MobileNav />
                </div>
            </div>
        </nav>
    );
};

export default Nav;