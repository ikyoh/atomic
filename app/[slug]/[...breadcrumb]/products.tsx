import { Container, Main } from "@/components/craft";
import Hero from "@/components/hero";
import { ProductCard } from "@/components/ProductCard";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { getCategoriesOfCategoryId, getProductCategoryBySlug, getProductsOfCategoryById } from "@/lib/wordpress";
import BreadCrumb from './breadcrumb';

export default async function Products({ slug, breadcrumb }: { slug: string, breadcrumb: string[] }) {

    const category = await getProductCategoryBySlug(slug);
    const categories = category ? await getCategoriesOfCategoryId(category.id) : []
    const products = category ? await getProductsOfCategoryById(category.id) : [];



    return (
        <>
            <Hero featuredURL={category.acf.featured} title={category.name} />
            <Main id="content">

                <Container>
                    <BreadCrumb breadcrumb={breadcrumb} />
                    <div className="flex flex-wrap justify-center mb-5">
                        {categories?.map(category => (
                            <ProductCategoryCard className="basis-1/2 md:basis-1/3" key={'product-category-' + category.id} category={category} breadcrumb={breadcrumb} />
                        ))}

                        {categories.length === 0 && products
                            ?.sort((a, b) => (a.acf.order ?? 0) - (b.acf.order ?? 0))
                            .map(product => (
                                <ProductCard className="basis-1/2 md:basis-1/3" key={`product-${product.id}`} productID={product.id} breadcrumb={breadcrumb} />
                            ))}

                    </div>

                    <div dangerouslySetInnerHTML={{ __html: category.acf.content }} />

                </Container>

            </Main>
        </>
    );
}

