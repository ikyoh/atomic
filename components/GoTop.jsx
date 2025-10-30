"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function GoTop(props) {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            // if the user scrolls down, show the button
            window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
        }
        // listen for scroll events
        window.addEventListener("scroll", toggleVisibility)

        // clear the listener on component unmount
        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    // handles the animation when scrolling to the top
    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "auto",
            })
    }

    return (
        <Button variant="icon" size="icon" className={cn("fixed right-4 md:right-10 bottom-20",
            isVisible ? "opacity-100" : "opacity-0")} onClick={scrollToTop}>
            <Image
                src="/icons/arrow.svg"
                alt="Back"
                width={42}
                height={22}
                className="scale-30 rotate-90"
            />
        </Button>
    );
}