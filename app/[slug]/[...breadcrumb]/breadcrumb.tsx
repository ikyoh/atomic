import {
    Breadcrumb as Bread,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProductsCategories } from "@/lib/wordpress";

import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function BreadCrumb({ breadcrumb = [], productTitle }: { breadcrumb: string[], productTitle?: string }) {

    const paths = breadcrumb.map((_, index) => {
        return breadcrumb.slice(0, index + 1).join('/');
    });

    const categories = await getProductsCategories()
    console.log('categories', categories)



    const slugToName = (slug: string) => {

        return categories.filter(f => f.slug === slug)[0]["name"]

    }

    return (
        <Bread className="my-10">
            <BreadcrumbList className="uppercase pl-0!">
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/produits">
                            <Home />
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumb.map((crumb, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator className="inline-flex items-center gap-1.5 mb-0">
                            /
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            {index === breadcrumb.length - 1 ? <span className="text-primary">{productTitle ? productTitle : slugToName(crumb)}</span> :
                                <BreadcrumbLink asChild>
                                    <Link href={`/produits/${paths[index]}`}>{slugToName(crumb)}</Link>
                                </BreadcrumbLink>
                            }
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Bread>
    );
}

