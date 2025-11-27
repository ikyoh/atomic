import BlockRenderer from "@/components/blockRenderer";
import { Container } from "@/components/craft";
import HeroCarousel from "@/components/HeroCarousel";
import { getPageBySlug } from "@/lib/wordpress";
import { parse } from "@wordpress/block-serialization-default-parser";

// Force static generation
export const dynamic = 'force-static';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const page = await getPageBySlug("accueil");

  if (!page) return null

  const blocks = parse(page.content.raw || "");

  return (
    <>
      {page.acf.carrousel &&
        <HeroCarousel isFullscreen images={page.acf.carrousel} youtubeID={page.acf.youtube_id} />
      }

      <Container>
        <h1 className="text-center font-black! uppercase">{page.title.rendered}</h1>
        <BlockRenderer blocks={blocks} />
      </Container>
    </>
  );
}
