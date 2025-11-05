import {
    getAllAchievements, getTaxonomy
} from "@/lib/wordpress";

import AchievementsFilter from "@/components/AchievementsFilter";
import AchievementsClient from "./achievementsClient";

export const dynamic = "auto";
export const revalidate = 600;

export default async function Achievements() {
    //const params = await searchParams;
    //const { author, tag, category, page: pageParam, search } = params;

    // Fetch data based on search parameters
    const [posts] = await Promise.all([
        getAllAchievements(),
        //search ? searchAuthors(search) : getAllAuthors(),
        //search ? searchTags(search) : getAllTags(),
        //search ? searchCategories(search) : getAllCategories(),
    ]);

    const secteurs = await getTaxonomy("secteur")
    const criteres = await getTaxonomy("critere")
    console.log('secteurs', secteurs)
    console.log('criteres', criteres)

    // Handle pagination
    // const page = pageParam ? parseInt(pageParam, 10) : 1;
    // const postsPerPage = 9;
    // const totalPages = Math.ceil(posts.length / postsPerPage);
    // const paginatedPosts = posts.slice(
    //     (page - 1) * postsPerPage,
    //     page * postsPerPage
    // );

    // Create pagination URL helper
    // const createPaginationUrl = (newPage: number) => {
    //     const params = new URLSearchParams();
    //     if (newPage > 1) params.set("page", newPage.toString());
    //     if (category) params.set("category", category);
    //     if (author) params.set("author", author);
    //     if (tag) params.set("tag", tag);
    //     if (search) params.set("search", search);
    //     return `/posts${params.toString() ? `?${params.toString()}` : ""}`;
    // };

    return (
        <>
            <AchievementsFilter secteurs={secteurs} criteres={criteres} />
            <AchievementsClient />
        </>
    );
}
