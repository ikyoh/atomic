import { Container, Section } from "@/components/craft";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import ProductsMegaMenu from "@/components/productsMegaMenu";
import ProductsMobileMenu from "@/components/productsMobileMenu";
import { getProductsCategories, getProductsOfCategoryById } from "@/lib/wordpress";


export default async function Products() {

    const categories = await getProductsCategories()

    const productsByCategoryies = await Promise.all(
        categories.map(async (category) => ({
            categoryId: category.id,
            products: [await getProductsOfCategoryById(category.id)],
        }))
    );

    console.log('productsByCategoryies', productsByCategoryies)

    return (
        <Section>
            <ProductsMegaMenu categories={categories} productsByCategoryies={productsByCategoryies} />
            <ProductsMobileMenu categories={categories} />
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
