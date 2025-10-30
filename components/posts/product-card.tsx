import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { getPostTypeById } from "@/lib/wordpress";

import {
  getCategoryById,
  getFeaturedMediaById
} from "@/lib/wordpress";

export async function ProductCard({ id }: { id: number }) {

  console.log('id', id)

  const post = await getPostTypeById('produits', id);

  console.log('produit', post)

  const media = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;

  const category = post.categories?.[0]
    ? await getCategoryById(post.categories[0])
    : null;
  console.log('media', media)

  return (
    <Link
      href={`/produits/${post.slug}`}
      className={cn(
        "border bg-accent/30 rounded-lg group flex justify-between flex-col not-prose gap-8 overflow-hidden!",
        "hover:bg-accent/75 transition-all shadow-md"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="h-48 w-full relative rounded-none flex items-center justify-center">
          {media.source_url ? (
            <Image
              className="h-full! w-full! object-cover rounded-none!"
              src={media.source_url
              }
              alt={media.title?.rendered || "Post thumbnail"}
              width={250}
              height={192}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-red-700">
              No image available
            </div>
          )}
        </div>
        <div className="p-4">
          <div
            className="text-primary font-medium group-hover:underline decoration-muted-foreground underline-offset-4 decoration-dotted transition-all"
          >{post.title.rendered}
          </div>

        </div>

      </div>

    </Link>
  );
}
