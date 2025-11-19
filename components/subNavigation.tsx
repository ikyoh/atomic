'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



const SubNavigation = ({ items }: { items: Array<{ icon: string; ancre: string; intitule: string }> }) => {


    const [isActive, setIsActive] = useState(false)

    return (
        <nav className={cn("flex fixed top-35 z-30 min-w-70 transition-all", isActive ? "translate-x-0 right-0" : "translate-x-full right-0 md:right-12")}>
            <div className={cn("bg-tertiary flex-none w-7 h-14 rounded-l-full absolute -left-6 -z-10 top-9 cursor-pointer flex items-center")} onClick={() => setIsActive(!isActive)}>
                <Image
                    alt="icon"
                    src={"/icons/arrow.svg"}
                    height={14}
                    width={21}
                    className={cn("h-4! ml-1 transition-all", isActive ? "rotate-180" : "rotate-0")}
                />
            </div>
            <ul className="bg-light/50 p-2 space-y-2 flex-1 rounded-l-md backdrop-blur-md">
                {items?.map((item, index) => (
                    <li key={index} className="rounded-sm before:content-none pl-0! ml-2">
                        <AnchorLink icon={item["icon"]} anchor={item["ancre"]} title={item["intitule"]} setIsActive={setIsActive} />
                    </li>
                ))}
            </ul>
        </nav>
    )
}


const AnchorLink = ({ anchor, title, icon, setIsActive }: { anchor: string; title: string; icon: string; setIsActive: (value: boolean) => void; }) => {

    const [activeId, setActiveId] = useState<string | null>(null);


    useEffect(() => {
        const handleScroll = () => {
            document.querySelectorAll("section").forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                    setActiveId(section.id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <Link
            href={(`#${anchor}`)}
            className={`flex items-center gap-3 w-full rounded-sm px-2 py-1 text-sm transition-all text-foreground hover:bg-light hover:text-primary ${activeId === anchor && 'inset-ring-1 inset-ring-primary bg-light'}`}
            onClick={() => setIsActive(false)}>
            <Image
                src={icon}
                alt={title}
                width={24}
                height={24}
                className="my-0! rounded-none! dark:invert"
            />
            {title}
        </Link>
    );
};

export default SubNavigation;
