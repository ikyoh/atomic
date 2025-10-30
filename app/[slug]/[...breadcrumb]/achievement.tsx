
import BackButton from "@/components/back";
import { Container } from "@/components/craft";
import Hero from "@/components/hero";
import { ProductCard } from "@/components/ProductCard";
import { TagCard } from "@/components/TagCard";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { getAchievementBySlug, getFeaturedMediaById } from "@/lib/wordpress";
import Image from "next/image";

export default async function Achievement({ slug }: { slug: string }) {

    const post = await getAchievementBySlug(slug);
    const featuredMedia = post.featured_media === 0 ? false : await getFeaturedMediaById(post.featured_media);

    console.log('post', post)

    return (
        <>
            <Hero featuredURL={featuredMedia.source_url} />
            <Container id="content" className="px-5 md:px-0">
                <div className="flex items-center my-6">
                    <h1>{post.title.rendered}</h1>
                    <BackButton className={"md:-mr-30 flex-none"} />
                </div>

                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                    {post.acf.galerie && post.acf.galerie?.map((item, index) =>

                        <Dialog key={'galerie' + index}>

                            <DialogTrigger asChild>
                                <Image
                                    key={'img' + index}
                                    alt="Réalisation"
                                    src={item}
                                    width={400}
                                    height={400}
                                    className="object-cover aspect-square cursor-pointer my-0!"
                                />
                            </DialogTrigger>
                            <DialogContent className="max-w-[calc(100vw-4rem)] sm:max-w-[calc(100vw-4rem)] max-h-[calc(100vh-4rem)] lg:max-w-4xl aspect-2/3 md:aspect-square border-0 bg-transparent">
                                <DialogHeader className="hidden">
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you&apos;re
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <Image
                                    key={'img' + index}
                                    alt="Réalisation"
                                    src={item}
                                    width={600}
                                    height={600}
                                    className="object-cover aspect-2/3 md:aspect-square w-full h-full rounded-md border border-neutral-600"
                                />
                            </DialogContent>

                        </Dialog>


                    )}

                </div>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">

                    {post.critere?.map(id =>
                        <TagCard key={`tag${id}`} tagID={id} />
                    )}
                    {post.acf.produit?.map((product: any) => (
                        <ProductCard key={product.ID} productID={product.ID} isTiny={true} />
                    ))}
                </div>

                <div className="border border-primary rounded-xl p-5 w-full md:w-lg my-20 space-y-5 font-bold">
                    <div className="text-center uppercase text-primary">Demandez votre devis gratuit dès aujourd’hui</div>
                    <p className="text-center">Vous avez un projet d’enseigne panneau ?</p>
                    <p className="text-center">Contactez-nous pour débuter la personnalisation de votre projet et recevez un devis gratuit de notre équipe pour connaître le coût exact de votre solution.</p>
                    <div className="flex items-center justify-center gap-5">
                        <Button>Contactez-nous</Button>
                    </div>
                </div>

            </Container>
        </>
    )
}
