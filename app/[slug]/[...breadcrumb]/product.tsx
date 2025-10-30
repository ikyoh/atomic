
import BackButton from "@/components/back";
import CallToAction from "@/components/CallToAction";
import { Container, Main } from "@/components/craft";
import Hero from "@/components/hero";
import { getFeaturedMediaById, getProductBySlug } from "@/lib/wordpress";
import Image from "next/image";
import BreadCrumb from "./breadcrumb";

export default async function Product({ slug, breadcrumb }: { slug: string, breadcrumb: string[] }) {

    const product = await getProductBySlug(slug);
    const featuredMedia = product.featured_media === 0 ? null : await getFeaturedMediaById(product.featured_media);

    console.log('product', product)
    return (
        <>
            <Hero featuredURL={featuredMedia.source_url} isProduct={true} />
            <Main id="content">
                <Container>
                    <BreadCrumb breadcrumb={breadcrumb} productTitle={product.title.rendered} />
                    <div className="flex items-center justify-start mb-5 gap-5">
                        <h1 className="flex-1 text-3xl font-bold uppercase">{product.title.rendered}</h1>
                        <BackButton />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 flex-wrap">
                        <div className="flex-1">
                            {product.acf.subtitle &&
                                <h2 className="bg-background text-xl! mb-5!">{product.acf.subtitle}</h2>
                            }
                            <div dangerouslySetInnerHTML={{ __html: product.content.rendered }} />
                        </div>
                        <div className="basis-1/3 space-y-5">
                            <div className="pt-1 px-5 pb-3 bg-light rounded-b-xl md:rounded-r-xl md:rounded-l-none" >
                                <Image
                                    alt="Icon"
                                    src={product.acf.icon}
                                    width={80}
                                    height={80}
                                />
                                <div className="w-full text-xs">Référence produit :</div>
                                <div className="font-bold">
                                    {product.acf.reference}
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: product.acf.wysiwyg }} className="mt-2" />
                            </div>

                        </div>
                        <CallToAction
                            title="Fabrication 100% française. Contactez Atomic Néon pour un devis personnalisé !"
                            description="Consultez nos fiches ou contactez-nous dès maintenant !"
                        />
                    </div>

                </Container>
            </Main >
        </>
    )
}
