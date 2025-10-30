import { cn } from "@/lib/utils";
import { getMediaById, getProductById } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";

export async function ProductCard({ productID, isTiny = false, breadcrumb = [], className }: { productID: number, isTiny?: boolean, breadcrumb: string[], className?: string }) {

    const product = await getProductById(productID)
    const media = product.featured_media ? await getMediaById(product.featured_media) : null;

    // fonction qui retourne le slug /produits/ + les valeurs concatenées de breadcrumb + product.slug
    const slug = breadcrumb.length > 0 ? `/produits/${breadcrumb.join('/')}/${product.slug}` : `/produits/${product.slug}`;


    return (
        <Link href={slug} className={cn(!isTiny && "p-3", className)}>
            <div className={cn("rounded-md overflow-clip shadow-sm hover:shadow-md hover:shadow-primary transition-shadow duration-200 aspect-square group relative", !isTiny ? "bg-linear-[155deg,#021222_5%,#314867_30%,#8FADD5_60%,#021222]" : "bg-primary")}>
                {!isTiny ?
                    <Image
                        src={media ? media.source_url : '/not-found.png'}
                        alt={product.title.rendered}
                        width={300}
                        height={300}
                        className="w-full h-48 object-contain aspect-square transition-all group-hover:scale-110 m-0! -top-3! absolute"
                    />
                    :
                    <Image
                        src={product.acf.icon ? product.acf.icon : '/not-found.png'}
                        alt={product.title.rendered}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-all group-hover:scale-110 m-0! p-1"
                    />
                }
                <div className="absolute bottom-0 w-full bg-primary px-2 py-1 transition-colors duration-200 text-center text-sm text-white h-[47px] flex items-center justify-center">
                    {!isTiny ? product.title.rendered : product.acf.reference}
                </div>
            </div>
        </Link>
    );
}

export async function ProductLink({ productID, breadcrumb = [], }: { productID: number, breadcrumb: string[] }) {

    const product = await getProductById(productID)

    // fonction qui retourne le slug /produits/ + les valeurs concatenées de breadcrumb + product.slug
    const slug = breadcrumb.length > 0 ? `/produits/${breadcrumb.join('/')}/${product.slug}` : `/produits/${product.slug}`;

    return (
        <Link href={slug}>
            {product.title.rendered}
        </Link>
    )

}