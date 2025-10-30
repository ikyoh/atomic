'use client'
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useEffect, useState } from 'react';



const indicatorVariants = cva(
    "transition-all fixed max-h-[14px] overflow-hidden",
    {
        variants: {
            variant: {
                default: "top-[75px]",
                mobile: "bottom-[50px] rotate-180"
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const NavIndicator = ({ options, variant }: { options: any, variant: any }) => {

    const [indicatorPosition, setIndicatorPosition] = useState(-500);
    const [indicatorWidth, setIndicatorWidth] = useState();

    useEffect(() => {
        const handleClick = (event) => {
            const button = event.target.closest('.navListener');
            if (button) {
                const rect = button.getBoundingClientRect();

                console.log('Position et dimensions du bouton :', {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                });


                setIndicatorPosition(rect.left + (rect.width / 2) - 200);
                setIndicatorWidth(rect.width + 20); // Ajout de 20px pour l'espacement
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className={cn(indicatorVariants({ variant }))} style={{ "left": indicatorPosition }}>
            <div className='bg-primary size-100 rounded-full drop-shadow-primary/50 drop-shadow-lg mt-3 rotate-180'></div>
        </div>
    )
}

export default NavIndicator