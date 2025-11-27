"use client";
import AchievementCard from "@/components/posts/achievement-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;


export default function AchievementsClient() {

    const searchParams = useSearchParams()
    const search = searchParams.toString()
    const secteur = searchParams.get('secteur')
    console.log('search', search)

    const fetchPosts = async ({ pageParam }: { pageParam: string }) => {
        const res = await fetch(pageParam + "&" + search)
        const headerLink = res.headers.get('link');
        const json = await res.json();
        return { posts: json, headerLink };
    }

    function parseLinkHeader(header: string) {
        const regex = /<([^>]+)>(?:;\s*rel="([^"]+)")?/g;
        const results = [];
        let match;
        while ((match = regex.exec(header)) !== null) {
            results.push({ url: match[1], rel: match[2] || null });
        }
        return results;
    }


    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isError
    } = useInfiniteQuery({
        queryKey: ['achivements', search],
        queryFn: fetchPosts,
        initialPageParam: `${baseUrl}/wp-json/wp/v2/realisations?per_page=9&page=1`,
        getNextPageParam: ({ headerLink }) => {
            if (!headerLink) return undefined;
            const links = parseLinkHeader(headerLink);
            if (links[links.length - 1].rel !== "next") return undefined
            if (links[links.length - 1].rel === "next") return links[links.length - 1].url
        },
    })


    if (isError) return <div>Error: {error.message}</div>;


    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-5">
                {isFetching && !isFetchingNextPage ?
                    Array.from({ length: 9 }).map((_, i) =>
                        <Skeleton key={i} className="h-full w-full aspect-square bg-neutral-500" />
                    )
                    :

                    data?.pages?.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.posts?.map((post: any) => (
                                <AchievementCard key={post.id} post={post} />
                            ))}
                        </React.Fragment>
                    ))
                }
            </div>
            {hasNextPage &&
                <div className="flex justify-center">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetching}
                    >
                        {isFetchingNextPage
                            ? 'Chargement'
                            : 'Afficher plus'
                        }
                    </Button>
                </div>}

        </>
    )

}