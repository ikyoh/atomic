'use client';
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import useScrollListener from "@/hooks/useScrollListener";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileNav } from "./mobile-nav";

import { usePathname } from 'next/navigation';
import ProductsBigMenu from "./nav-bigmenu";


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

                    {/* <h2 className="text-sm">{siteConfig.site_name}</h2> */}
                </Link>
                {children}
                <div className="flex items-center gap-2">
                    {/* <div className="mx-2 hidden md:flex">
                        {Object.entries(mainMenu).map(([key, href]) => (
                            <Button key={href} asChild variant="ghost" size="sm">
                                <Link href={href} className={`uppercase ${currentPath === href ? "text-primary font-semibold" : "text-black"}`}>
                                    {key.charAt(0) + key.slice(1)}
                                </Link>
                            </Button>
                        ))}
                    </div> */}
                    <ProductsBigMenu />
                    <Button asChild variant={"secondary"} className="hidden sm:flex">
                        <Link href="/contact" className="uppercase">Contact</Link>
                    </Button>
                    <MobileNav />
                </div>
            </div>
        </nav>
    );
};

export default Nav;