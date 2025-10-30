import ProductsMegaMenu from "@/components/productsMegaMenu";
import ProductsMobileMenu from "@/components/productsMobileMenu";
import { getProductsCategories, getProductsOfCategoryById } from "@/lib/wordpress";
import React from "react";

interface BlogLayoutProps {
    children: React.ReactNode;
    params: { breadcrumb: string[]; slug: string };
}

export default async function BlogLayout({ children, params }: BlogLayoutProps) {

    const categories = await getProductsCategories()

    const productsByCategoryies = await Promise.all(
        categories.map(async (category) => ({
            categoryId: category.id,
            products: await getProductsOfCategoryById(category.id),
        }))
    );

    const { breadcrumb, slug } = await params;

    return (
        <>
            {slug === "produits" &&
                <>
                    <ProductsMegaMenu
                        categories={categories}
                        productsByCategoryies={productsByCategoryies}
                    />
                    <ProductsMobileMenu
                        categories={categories}
                        productsByCategoryies={productsByCategoryies}
                    />
                </>
            }
            {children}
        </>
    );
}