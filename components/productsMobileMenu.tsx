'use client'
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export default function ProductsMobileMenu({ categories, productsByCategoryies }: { categories: object[], productsByCategoryies: object[] }) {

    const [isActive, setIsActive] = useState(false)

    return (
        <div className={cn("block md:hidden fixed z-10 w-screen left-0 transition-all max-h-[calc(100vh-175px)]", isActive ? "translate-y-0 top-[90px]" : "top-[118px] -translate-y-full")} >
            <div className="max-h-[calc(100vh-210px)] overflow-y-scroll">
                <Accordion
                    type="single"
                    collapsible
                    className="w-screen bg-primary"
                >
                    {categories?.filter(f => f.parent === 0)?.sort((a, b) => (a.acf.order ?? 0) - (b.acf.order ?? 0)).map((category, index) => (
                        categories?.filter(f => f.parent === category.id).length === 0 ?
                            <AccordionItem value={`item-${index}`} className="py-4">
                                <Link href={`/produits/${category.slug}`} className="text-sm text-white font-bold pl-5">
                                    {category.name}
                                </Link>
                            </AccordionItem>
                            :
                            <AccordionItem key={`item-${index}`} value={`item-${index}`}>
                                <AccordionTrigger className="text-white font-bold px-5">
                                    <span>
                                        {category.name}
                                    </span>
                                    <ChevronDown />
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    {categories?.filter(f => f.parent === category.id)?.sort((a, b) => (a.acf.order ?? 0) - (b.acf.order ?? 0)).map((subcategory, index) => (
                                        <Link href={`/produits/${category.slug}/${subcategory.slug}`} className="text-white text-sm font-bold pl-10">
                                            {subcategory.name}
                                        </Link>
                                    ))}

                                </AccordionContent>
                            </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div
                className={cn("bg-tertiary sticky bottom-0 w-14 h-7 rounded-b-full left-1/2 z-20 -translate-x-1/2 cursor-pointer flex items-center justify-center")}
                onClick={() => {
                    setIsActive(!isActive);
                }}
            >
                <Image
                    alt="icon"
                    src={"/icons/arrow.svg"}
                    height={14}
                    width={21}
                    className={cn("h-4! transition-all", isActive ? "rotate-90" : "-rotate-90")}
                />
            </div>
        </div >
    )
}

