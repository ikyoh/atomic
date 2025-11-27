import BlockRenderer from "@/components/blockRenderer";
import { Container } from "@/components/craft";
import HeroCarousel from "@/components/HeroCarousel";
import { getFeaturedMediaById, getPageBySlug } from "@/lib/wordpress";
import { parse } from "@wordpress/block-serialization-default-parser";
import NotFound from "./not-found";

// Force static generation
export const dynamic = 'force-static';

// Revalidate every hour (3600 seconds) - ajustez selon vos besoins
export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const page = await getPageBySlug("accueil");

  const featuredMedia = page.featured_media === 0 ? false : await getFeaturedMediaById(page.featured_media);


  if (!page) return <NotFound />;

  const blocks = parse(page.content.raw || "");
  return (
    <>
      {page.acf.carrousel &&
        <HeroCarousel isFullscreen images={page.acf.carrousel} youtubeID={page.acf.youtube_id} />
      }

      <Container id="content">
        <h1 className="text-center font-black! uppercase">{page.title.rendered}</h1>
        {/* <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} /> */}
        <BlockRenderer blocks={blocks} />
      </Container>
    </>
  );
}
