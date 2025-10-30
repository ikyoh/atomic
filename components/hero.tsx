
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
export default function Hero({ featuredURL, title, subtitle, isProduct = false }: { featuredURL?: string, title?: string, subtitle?: string, isProduct?: boolean }) {
    return (
        <div className={cn("relative h-[calc(100vh-144px)] md:h-[485px] bg-no-repeat bg-center flex flex-col justify-end items-center pb-5", ` bg-[url(${featuredURL})]`, isProduct ? "bg-contain before:content-['']  before:absolute before:inset-0 before:block  before:bg-linear-[155deg,#021222_5%,#314867_30%,#8FADD5_60%,#021222] before:z-[-5]" : " bg-cover")}
            style={{ backgroundImage: `url(${featuredURL})` }}>
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
            <Link href={"#content"} className="md:hidden animate-bounce flex items-center justify-center text-white size-12 bg-neutral-500/50 rounded-full mt-4">
                <ChevronDown />
            </Link>

        </div>
    );
}