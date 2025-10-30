import "./globals.css";

import { Container, Main } from "@/components/craft";
import GoTop from "@/components/GoTop";
import Logo from "@/components/logo";
import { MobileNav } from "@/components/nav/mobile-nav";
import NavIndicator from "@/components/nav/navIndicator";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getSiteOptions } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import QueryProvider from "./queryProvider";

import homePicto from '../public/picto-3D.svg';
import phonePicto from '../public/picto-phone.svg';

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("font-sans antialiased", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Main className="min-h-screen">
            <QueryProvider>
              {children}
            </QueryProvider>
            <GoTop />
          </Main>
          <Footer />
          <MobileNav />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Header = () => {
  return (
    <header className={cn("sticky z-50 top-0 border-b border-primary h-[90px] bg-background")}>
      <div className="h-full max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center">
        <div className="basis-full">
          <Link
            className="hover:opacity-75 transition-all flex gap-4 items-center"
            href="/">
            <Logo width={87} />
          </Link>
        </div>

        <Nav />
        <div className="flex items-center justify-end gap-2 basis-full">
          <ThemeToggle />
          <Button asChild className="flex rounded-full h-10 w-10 p-0 drop-shadow-primary/50 drop-shadow-lg">
            <Link href="/">
              <Image
                src={homePicto}
                alt="Pictogramme vue 3D"
                width={18}
                height={18}
              />
            </Link>
          </Button>
          <Button asChild className="flex rounded-full h-10 w-10 p-0 drop-shadow-primary/50 drop-shadow-lg">
            <Link href="/contact" className="decoration-none">
              <Image
                src={phonePicto}
                alt="Pictogramme téléphone"
                width={17}
                height={22}
              />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}


const Nav = async () => {

  const options = await getSiteOptions();

  return (
    <nav className="relative mx-2 hidden md:flex items-center gap-2">
      {options['navigation'].filter(f => f.is_desktop).map(item => (
        <Button key={item.slug} variant={"link"} asChild size="sm" className="uppercase text-base navListener">
          <Link href={item.slug}>
            {item.label}
          </Link>
        </Button>
      ))}
      <NavIndicator options={options['navigation']} />
    </nav >
  );
};

const Footer = async () => {

  const options = await getSiteOptions();

  return (
    <footer className="bg-secondary mb-10 md:mb-0">
      <Container className="flex flex-col md:flex-row justify-between space-y-0">
        <p className="text-muted-foreground text-center mb-0!">
          &copy; {new Date().getFullYear()} Atomic Néon - Tous droits réservés
        </p>
        <Link href="/mentions-legales" className="text-muted-foreground underline!">
          Mentions légales
        </Link>
      </Container>
    </footer>
  );
};
