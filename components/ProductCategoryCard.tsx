import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ProductCategoryCard({ category, breadcrumb = [], className, ...props }: { category: any, breadcrumb?: string[], className?: string }) {

    // fonction qui retourne le slug /produits/ + les valeurs concatenées de breadcrumb + category.slug
    const slug = breadcrumb.length > 0 ? `/produits/${breadcrumb.join('/')}/${category.slug}` : `/produits/${category.slug}`;

    console.log('category', category)

    return (
        <Link href={slug} className={cn("p-2 sm:p-3 md:p-5", className)}>
            <div className="overflow-clip aspect-square relative group shadow-lg shadow-neutral-400 dark:shadow-neutral-800 hover:shadow-primary dark:hover:shadow-primary transition-shadow duration-200 group rounded-md">
                <Image
                    src={category.acf?.thumbnail || '/not-found.png'}
                    alt={category.name || 'Category'}
                    width={300}
                    height={300}
                    className="w-full h-[calc(100%-47px)]! object-cover aspect-[calc(300/240)] transition-all group-hover:scale-110 m-0! rounded-none! bg-light"
                    unoptimized
                />
                <div className="absolute bottom-0 w-full bg-primary p-2 transition-colors duration-200 text-center text-sm text-white h-[47px] flex items-center justify-center">
                    {category.name}
                </div>
            </div>
        </Link>
    );
}
