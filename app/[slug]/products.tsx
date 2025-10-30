import { Container, Section } from "@/components/craft";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import ProductsMegaMenu from "@/components/productsMegaMenu";
import ProductsMobileMenu from "@/components/productsMobileMenu";
import { getProductsCategories, getProductsOfCategoryById } from "@/lib/wordpress";


export const dynamic = "auto";
export const revalidate = 600;

export default async function Products({
    searchParams,
}: {
    searchParams: Promise<{
        author?: string;
        tag?: string;
        category?: string;
        page?: string;
        search?: string;
    }>;
}) {
    const params = await searchParams;

    const categories = await getProductsCategories()


    const productsByCategoryies = await Promise.all(
        categories.map(async (category) => ({
            categoryId: category.id,
            products: await getProductsOfCategoryById(category.id),
        }))
    );

    console.log('productsByCategoryies', productsByCategoryies)

    //const { author, tag, category, page: pageParam, search } = params;

    // Fetch data based on search parameters
    //const [categories] = await Promise.all([
    // getProductsCategories(),
    //search ? searchAuthors(search) : getAllAuthors(),
    //search ? searchTags(search) : getAllTags(),
    //search ? searchCategories(search) : getAllCategories(),
    //]);

    console.log('categories', categories)

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
        <Section>
            <ProductsMegaMenu categories={categories} productsByCategoryies={productsByCategoryies} />
            <ProductsMobileMenu categories={categories} productsByCategoryies={productsByCategoryies} />
            <Container>
                <div className="flex flex-wrap justify-center">
                    {categories?.filter(f => f.parent === 0)?.sort((a, b) => (a.acf.order ?? 0) - (b.acf.order ?? 0)).map((category) => (
                        <ProductCategoryCard key={'product-category-' + category.id} category={category}
                            className="basis-1/2 md:basis-1/3" />
                    ))}
                </div>
            </Container>
        </Section>
    );
}
