import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import Link from "next/link"

import { ProductCard, ProductLink } from "./ProductCard"
import { ProductCategoryCard } from "./ProductCategoryCard"

export default function ProductsMegaMenu({ categories, productsByCategoryies }: { categories: object[], productsByCategoryies: object[] }) {

    return (
        <div className="hidden md:block fixed w-screen z-20 left-0 top-[90px] bg-primary">
            <NavigationMenu viewport={true} className="mx-auto">
                <NavigationMenuList>
                    {categories?.filter(f => f.parent === 0)?.sort((a, b) => (a.acf.order ?? 0) - (b.acf.order ?? 0)).map((category) => (
                        <NavigationMenuItem key={category.id}>
                            <NavigationMenuTrigger asChild>
                                <Link href={`/produits/${category.slug}`}>
                                    {category.name}
                                </Link>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-white/20!">
                                <ul className="flex flex-row justify-center flex-wrap w-screen max-w-5xl *:basis-1/2 *:md:basis-1/5! *:px-3">
                                    {categories?.filter(f => f.parent === category.id)?.sort((a, b) => (a.acf.order ?? 0) - (b.acf.order ?? 0)).map((subcategory) => (
                                        <li key={'product-category-' + subcategory.id}>
                                            <ProductCategoryCard
                                                category={subcategory}
                                                breadcrumb={[category.slug]}
                                                className="w-full"
                                            />
                                            {productsByCategoryies?.filter(f => f.categoryId === subcategory
                                                .id)?.map((categoryOfProducts) => (
                                                    categoryOfProducts.products.map(product =>
                                                        <li key={`product-${product.id}`}>
                                                            <ProductLink
                                                                productID={product.id}
                                                                breadcrumb={[category.slug]}
                                                            />
                                                        </li>
                                                    )
                                                ))}                                            </li>
                                    ))}
                                    {productsByCategoryies?.filter(f => f.categoryId === category.id)?.map((categoryOfProducts) => (
                                        categoryOfProducts.products.map(product =>
                                            <li key={`product-${product.id}`}>
                                                <ProductCard
                                                    productID={product.id}
                                                    breadcrumb={[category.slug]}
                                                />
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

