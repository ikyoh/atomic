'use client'
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Post } from "@/lib/wordpress.d";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";


const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export default function AchievementCard({ post }: { post: Post }) {

  async function fetchMedia() {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/media/${post.featured_media}`);
    if (!res.ok) {
      throw new Error("Failed to fetch media");
    }
    return res.json();
  }


  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`media-${post.featured_media}`],
    queryFn: fetchMedia,
  });

  if (isLoading) return <Skeleton className="h-full w-full aspect-square bg-neutral-500" />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Link
      href={`/realisations/${post.slug}`}
      className={cn(
        "rounded-lg group flex flex-col overflow-hidden",
        "hover:bg-accent/75 transition-all hover:shadow-md hover:shadow-primary relative"
      )}
    >


      {data?.source_url ? (
        <Image
          className="h-full w-full object-cover aspect-square tranform group-hover:scale-110 transition-all ease-in-out duration-300 m-0! rounded-none!"
          src={data.source_url}
          alt={post.title?.rendered || "Post thumbnail"}
          width={600}
          height={600}
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-red-700">
          No image available
        </div>
      )}

      <div className="w-full text-center p-4 bg-primary text-white absolute bottom-0 uppercase transition-transform duration-300 translate-y-full group-hover:translate-y-0">
        {post.title.rendered}
      </div>
    </Link>
  );
}
