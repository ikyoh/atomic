
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Hero({ featuredURL, title, subtitle, isProduct = false }: { featuredURL?: string, title?: string, subtitle?: string, isProduct?: boolean }) {
    return (
        <div className={cn("relative h-[calc(100vh-144px)] md:h-[485px] bg-no-repeat bg-center flex flex-col justify-end items-center pb-30")}>

            <Image
                src={featuredURL || ""}
                alt={title || "Featured Image"}
                fill
                className={cn("rounded-none! mt-0!", isProduct ? "object-contain" : "object-cover")}
            />
            <div className="z-2 absolute bottom-20 sm:bottom-0 h-1/2 md:h-auto left-0 right-0 flex flex-col items-center justify-start pb-10">
                {title &&
                    <h1 className="px-5 text-[2.5rem] font-black! text-center text-white uppercase text-shadow-primary text-shadow-[0_5px_20px] mb-3">
                        {title}
                    </h1>
                }
                {subtitle &&
                    <div className="px-5 text-lg! font-bold! text-center uppercase text-white">
                        {subtitle}
                    </div>
                }
            </div>
            <Link href={"#content"} className="z-3 md:hidden animate-bounce flex items-center justify-center text-white size-12 bg-neutral-500/50 rounded-full absolute bottom-35">
                <ChevronDown />
            </Link>

        </div>
    );
}