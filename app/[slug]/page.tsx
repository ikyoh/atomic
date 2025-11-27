import BlockRenderer from "@/components/blockRenderer";
import { Container } from "@/components/craft";
import Hero from "@/components/hero";
import HeroCarousel from "@/components/HeroCarousel";
import SubNavigation from "@/components/subNavigation";
import { cn } from "@/lib/utils";
import { getAllPages, getFeaturedMediaById, getPageBySlug } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";
import { parse } from "@wordpress/block-serialization-default-parser";
import { Metadata } from "next";
import Achievements from "./achievements";
import Contact from "./contact";
import Products from "./products";


export async function generateStaticParams() {
  const posts = await getAllPages();
  return posts.filter(f => f.slug !== "accueil").map((post) => ({
    slug: post.slug,
  }))
}

export const dynamic = "force-static";
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;


  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }


  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", page.title.rendered);
  // Strip HTML tags for description and limit length
  const description = page.excerpt?.rendered
    ? page.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
    : page.content.rendered
      .replace(/<[^>]*>/g, "")
      .trim()
      .slice(0, 200) + "...";
  ogUrl.searchParams.append("description", description);

  return {
    title: page.title.rendered,
    description: description,
    openGraph: {
      title: page.title.rendered,
      description: description,
      type: "article",
      url: `${siteConfig.site_domain}/pages/${page.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title.rendered,
      description: description,
      images: [ogUrl.toString()],
    },
  };
}



export default async function Page({
  params, searchParams
}: {
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ searchParams: string }>
}) {
  const { slug } = await params;
  const search = await searchParams;
  const page = await getPageBySlug(slug);
  const featuredMedia = page?.featured_media === 0 ? "" : await getFeaturedMediaById(page.featured_media);

  const parsedBlocks = parse(page.content.raw ? page.content.raw : "");
  const blocks = parsedBlocks.map(block => ({
    ...block,
    attrs: block.attrs || {}
  }));
  return (
    <>
      {page.acf.carrousel ?
        <HeroCarousel images={page.acf.carrousel} title={page.title.rendered} subtitle={page.acf.subtitle} />
        : featuredMedia ?
          <Hero featuredURL={featuredMedia && typeof featuredMedia !== 'string' ? featuredMedia.source_url : ''} title={page.title.rendered} subtitle={page.acf.subtitle} /> : null
      }

      <Container id="content" className={cn("relative",
        page.template === "page-services" ? 'template-services' : '',
        page.template === "page-atomic" ? 'template-atomic' : ''
      )}>

        {
          page.template && page.template === "page-realisations" && (
            <Achievements />
          )
        }

        {page.acf['navigation_interne'] &&
          <SubNavigation items={page.acf['navigation_interne']} />
        }

        {page.template && page.template === "page-produits" && (
          <Products />
        )}
        <BlockRenderer blocks={blocks} />

        {page.template && page.template === "page-contact" && (<Contact />)}

      </Container >

    </>
  );
}
