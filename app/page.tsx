import BlockRenderer from "@/components/blockRenderer";
import { Container } from "@/components/craft";
import HeroCarousel from "@/components/HeroCarousel";
import { getFeaturedMediaById, getPageBySlug } from "@/lib/wordpress";
import { siteConfig } from "@/site.config";
import { parse } from "@wordpress/block-serialization-default-parser";
import { Metadata } from "next";
import NotFound from "./not-found";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {



  const page = await getPageBySlug("accueil");


  if (!page) {
    return {};
  }

  console.log('page', page)

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
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const page = await getPageBySlug("accueil");

  const featuredMedia = page.featured_media === 0 ? false : await getFeaturedMediaById(page.featured_media);

  console.log('page', page)

  if (!page) return <NotFound />;

  const blocks = parse(page.content.raw || "");
  return (
    <>
      {page.acf.carrousel &&
        <HeroCarousel isFullscreen images={page.acf.carrousel} youtubeID={page.acf.youtube_id} />
      }

      <Container>
        <h1 className="text-center font-black! uppercase">{page.title.rendered}</h1>
        {/* <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} /> */}
        <BlockRenderer blocks={blocks} />
      </Container>
    </>
  );
}
