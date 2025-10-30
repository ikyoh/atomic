'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";


import { useSiteContext } from '@/context/context';
import { use } from 'react';


export function NavigationMenuDemo() {

  const promises = useSiteContext()
  const categories = use(promises)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/services" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Services
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Produits
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-8 p-8 md:w-[500px] md:grid-cols-3 lg:w-[1000px]">
              {categories
                .filter(f => f.parent === 0)
                .sort((a, b) => a.acf["order"] - b.acf["order"])
                .map((categorie) => (

                  <ListItem
                    key={categorie.id}
                    title={categorie.name}
                    href={"/produits/categorie/" + categorie.slug}
                    className="px-5 py-3"
                    iconUrl={categorie.icon
                      ? categorie.icon.source_url : null}
                  >
                    <div className="flex flex-col bg">

                      {categories.filter(f => f.parent === categorie.id).map((subcategorie) => (

                        <Link href={"/produits/categorie/" + subcategorie.slug} key={subcategorie.id} legacyBehavior passHref
                        >
                          <NavigationMenuLink className="text-sm text-center text-black hover:text-primary transition-none w-full">
                            {subcategorie.name}
                          </NavigationMenuLink>
                        </Link>
                        // <Link href={"/produits/categorie/" + subcategorie.slug} key={subcategorie.id} passHref className="text-sm text-center text-black hover:text-primary transition-none w-full">
                        //     {subcategorie.name}
                        //   </Link>
                      ))}
                    </div>
                  </ListItem>
                ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/realisations" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Réalisations
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/qui-sommes-nous" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Qui sommes nous ?
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/qui-sommes-nous" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Espace revendeur
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu >
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, iconUrl, children, ...props }, ref) => {
  return (
    <div className="bg-gradient-to-b from-secondary/5 to-white rounded-md shadow-lg text-center flex flex-col relative">
      <div className="self-center z-10 absolute w-16 bg-gradient-to-b from-transparent from-10% via-background via-30% to-background to-90% flex items-center justify-center p-3 rounded-b-full -top-6 before:content-[''] before:absolute before:top-[24px] before:-left-[18px] before:w-[20px] before:h-[20px] before:bg-transparent before:rounded-tr-[50px] before:shadow-[5px_-5px_0_5px_#FFF] after:content-[''] after:absolute after:top-[24px] after:-right-[18px] after:w-[20px] after:h-[20px] after:bg-transparent after:rounded-tl-[50px] after:shadow-[-5px_-5px_0_5px_#FFF]">

        {iconUrl && <img
          src={iconUrl}
          alt="icon"
        />}
      </div>
      <NavigationMenuLink asChild className="mt-12">
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none">{title}</div>
        </a>
      </NavigationMenuLink>

      {children}

    </div >
  )
})
ListItem.displayName = "ListItem"

export default function ProductsBigMenu() {
  return (

    <NavigationMenuDemo />

  )
}

