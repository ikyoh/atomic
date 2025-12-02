import TeamBlockClient from '@/components/animate/team-block';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { getMediaById } from '@/lib/wordpress';
import parse from 'html-react-parser';
import Image from 'next/image';
import React from 'react';
import CallToAction from './CallToAction';
import { Flex } from './ui/flex';
import { Grid } from './ui/grid';

export interface GutenbergBlock {
    blockName: string | null;
    attrs: Record<string, any>;
    innerHTML: string;
    innerBlocks: GutenbergBlock[];
}


// Individual block components
const ParagraphBlock = ({ innerHTML }: { innerHTML: string }) => (
    parse(innerHTML)
);

const ImageBlock = ({ innerHTML, attrs }: { innerHTML: string, attrs: GutenbergBlock["attrs"] }) => {

    const className = innerHTML.match(/class="([^"]*)"/)?.[1] || '';
    return <Picture id={attrs.id} className={className} />
}

const HeadingBlock = ({ innerHTML }: { innerHTML: string }) => {
    const match = innerHTML.match(/<(h[1-6])([^>]*)>(.*?)<\/h[1-6]>/);
    if (!match) {
        // fallback if not found
        return <div dangerouslySetInnerHTML={{ __html: innerHTML }} />;
    }
    const Tag = match[1] as keyof JSX.IntrinsicElements;
    // Extract class from the tag if present
    const classMatch = match[2].match(/class="([^"]*)"/);
    const className = classMatch ? classMatch[1] : undefined;
    // Extract content between tags
    const content = match[3];

    return React.createElement(Tag, { className, dangerouslySetInnerHTML: { __html: content } });
};

const EmbedBlock = ({ attrs, innerHTML }: { attrs: GutenbergBlock["attrs"], innerHTML: string }) => {

    if (attrs && attrs.type === 'video' && attrs.providerNameSlug === "youtube")
        return <div className="relative overflow-hidden aspect-video mb-5">
            <iframe className='absolute top-0 left-0 w-full h-full' width="560" height="315" src="https://www.youtube.com/embed/PP2Bea1WHcI?si=M4hJrFoFF8e1lIWz" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    return <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
};

const GroupBlock = ({ innerHTML, innerBlocks, attrs, innerContent }: { innerHTML: string; innerBlocks: GutenbergBlock[], attrs: GutenbergBlock["attrs"], innerContent: string }) => {

    const className = innerHTML.match(/class="([^"]*)"/)?.[1] || '';
    const id = innerHTML.match(/id="([^"]*)"/)?.[1] || false;
    const TagName = attrs.tagName ? attrs.tagName : "div"

    if (attrs && attrs.layout && attrs.layout.type === 'grid') return (
        <Grid variant={attrs.layout.columnCount} className={className}>
            <BlockRenderer blocks={innerBlocks} />
        </Grid>
    )
    if (attrs && attrs.layout && attrs.layout.type === 'flex') return (
        <Flex orientation={attrs.layout.orientation} justifyContent={attrs.layout.justifyContent} flexWrap={attrs.layout.flexWrap} >
            <BlockRenderer blocks={innerBlocks} />
        </Flex >
    )
    return (
        <TagName {...(id && { "id": id })} className={className}>
            <BlockRenderer blocks={innerBlocks} />
        </TagName>
    )
}

const LogosBlock = ({ attrs }: { attrs: any }) => {


    if (!attrs.data.logos) return null

    return (
        <div className="overflow-hidden relative max-w-screen group mb-0">
            <div className="relative">
                <InfiniteSlider
                    speed={40}
                    gap={60}
                    reverse={attrs.data.is_reverse === "0" ? false : true}>

                    {
                        attrs.data.logos?.map((logo: number, index: number) => (
                            <div key={"logos_" + index} className="flex">

                                <div className="flex items-center space-x-4">
                                    <Picture
                                        id={logo}
                                        className="w-14 h-auto"
                                        width={58}
                                        height={58}
                                    />
                                </div>
                            </div>
                        ))
                    }

                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-30"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-30"></div>
                <ProgressiveBlur
                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                    direction="left"
                    blurIntensity={0.5}
                />
                <ProgressiveBlur
                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                    direction="right"
                    blurIntensity={0.5}
                />
            </div>
        </div>
    )

};

const CarouselBlock = ({ attrs, innerHTML }: { attrs: any, innerHTML: string }) => {

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="max-w-screen relative p-0"
            isHero={true}
        >
            <CarouselContent className=''>
                {attrs.data.gallery.map((item: number, index: number) => (
                    <CarouselItem
                        key={"carousel_" + index}
                        className="h-150 w-full p-0!"
                    >
                        <Picture
                            id={item}
                            figureClassName='h-full w-full my-0! rounded-none!' className="object-cover h-full! w-full!"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='left-12 md:left-12' />
            <CarouselNext className='right-12 md:right-12' />
        </Carousel>
    )

};

const CarouselLabelBlock = ({ attrs }: { attrs: any }) => {

    return (

        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="max-w-full!"
        >
            <CarouselContent>
                {Array.from({ length: attrs.data.cards }).map((_, index) => (
                    <CarouselItem key={"carousel_" + index} className="md:basis-1/2 pt-0">
                        <div className="p-5 rounded-2xl bg-light h-full">

                            <Picture
                                id={attrs.data[`cards_${index}_image`]} className="aspect-3/2 rounded-none! mt-0!"
                                width={304}
                                height={202}
                            />

                            <span className="font-medium">{attrs.data[`cards_${index}_text`]
                            }</span>

                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )

};

const GridCardsBlock = ({ attrs }: { attrs: any }) => {

    return (

        <div className="flex flex-col gap-8">

            {Array.from({ length: attrs.data.blocks }).map((_, index) => (
                <div key={"gridcards_" + index} className="rounded-2xl bg-light overflow-hidden min-h-[280px] md:grid md:grid-cols-2 shadow-md">
                    <div className={`overflow-hidden ${index % 2 === 1 && 'order-last'
                        }`}>
                        <Picture
                            id={attrs.data[`blocks_${index}_image`]}
                            figureClassName={`rounded-none! w-full! md:h-full! h-[280px]! mt-0! ${index % 2 === 1 && 'order-last'
                                }`}
                            className='zoomin object-cover w-full! md:h-full!'
                        />
                    </div>
                    <div className="p-5">
                        <p className="font-bold uppercase">{attrs.data[`blocks_${index}_title`]}</p>
                        <p>{attrs.data[`blocks_${index}_content`]}</p>
                    </div>
                </div>

            ))
            }

        </div >

    )

};

const AccordionCardsBlock = ({ attrs }: { attrs: any }) => {

    return (

        <Accordion type="single" collapsible className="columns-2 space-y-5 md:grid md:grid-cols-4 gap-5">
            {[0, 1, 2, 3].map((groupIndex) => {
                const start = Math.floor((attrs.data.cards * groupIndex) / 4);
                const end = Math.floor((attrs.data.cards * (groupIndex + 1)) / 4);
                return (
                    <div key={"accordioncards_" + groupIndex} className="space-y-5">
                        {Array.from({ length: end - start }).map((_, index) => {
                            const realIndex = start + index;
                            return (
                                <AccordionItem
                                    key={"accordioncards_" + realIndex}
                                    value={"accordionItem" + realIndex}
                                    className={cn("rounded-2xl shadow-md", attrs.data.color === 'red' ? "bg-primary" : "bg-black dark:bg-light")}
                                >
                                    <AccordionTrigger className='cursor-pointer'>
                                        <div className="px-3 w-full">
                                            <div className="overflow-hidden flex items-start justify-center w-full m-0">
                                                <Picture
                                                    id={attrs.data[`cards_${realIndex}_icon`]}
                                                    className="w-[120px] h-auto h-max-[120px] object-cover m-0!"
                                                />
                                            </div>
                                            <p className="text-white text-sm! pt-3 font-bold uppercase leading-5! mb-0!">
                                                {attrs.data[`cards_${realIndex}_title`]}
                                            </p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="px-3">
                                            <p className="text-xs! leading-4! text-white">{attrs.data[`cards_${realIndex}_content`]}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </div>
                );
            })}
        </Accordion >

    )

};

const AccordionPictureBlock = ({ attrs }: { attrs: any }) => {

    return (
        <div className=''>
            <Accordion type="single" collapsible defaultValue="item-0">
                <Tabs defaultValue="item-0" className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 items-center" orientation="vertical">
                    <TabsList className="space-y-3 h-auto w-full md:col-span-2 bg-transparent">
                        {Array.from({ length: attrs.data.blocks }).map((_, index) => (
                            <AccordionItem value={"item-" + index} key={"AccordionPictureBlockItem" + index} className=" outline-primary outline-3 -outline-offset-3 [&_h3]:mt-0! [&_h3]:mb-0! rounded-sm bg-primary data-[state=open]:bg-white">
                                <AccordionTrigger asChild>
                                    <TabsTrigger value={"item-" + index} className="uppercase font-bold text-lg py-2 not-data-[state=open]:text-white dark:not-data-[state=open]:text-white data-[state=open]:text-primary dark:data-[state=open]:text-primary">
                                        {attrs.data[`blocks_${index}_title`]}
                                    </TabsTrigger>
                                </AccordionTrigger>
                                <AccordionContent className="px-3 text-black">
                                    <div className="font-bold text-base leading-4 mb-1">
                                        {attrs.data[`blocks_${index}_subtitle`]}
                                    </div>
                                    <p className="mb-0! text-base/5!">
                                        {attrs.data[`blocks_${index}_content`]}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                        }

                    </TabsList>
                    <div className="bg-black rounded-3xl p-5 flex-none w-full h-[280px] md:h-[600px] relative">
                        {Array.from({ length: attrs.data.blocks }).map((_, index) => (
                            <TabsContent key={"tabcontent-" + index} value={"item-" + index} className="h-full w-full">
                                <Picture
                                    id={attrs.data[`blocks_${index}_image`]}
                                    className="object-cover! w-full! h-full! mt-0! border border-white/50 rounded-xl!"
                                    figureClassName='my-0! h-full! overflow-hidden border-primary'
                                />
                            </TabsContent>
                        ))}
                    </div>
                </Tabs >
            </Accordion >
        </div >
    )

};

const TimelineBlock = ({ attrs }: { attrs: any }) => {

    return (
        <ScrollArea className="w-full mb-3">
            <div className="flex w-max space-x-6">
                {Array.from({ length: attrs.data.blocks }).map((_, index) => (
                    <div key={"timeline_" + index} className="w-60">
                        <Picture
                            id={attrs.data[`blocks_${index}_image`]}
                            className="w-30 rounded-full! aspect-square object-cover"
                        />
                        <div>
                            <p className="font-bold uppercase">{attrs.data[`blocks_${index}_date`]}</p>
                            <p className='text-sm! leading-5!'>{attrs.data[`blocks_${index}_content`]}</p>
                        </div>
                    </div>

                ))
                }
            </div >
            <ScrollBar orientation="horizontal" />
        </ScrollArea>


    )

};

const TeamBlock = ({ attrs }: { attrs: any }) => {

    return (
        <div>
            {attrs.data.title && (
                <div className="text-xl font-bold mb-5 border-b">{attrs.data.title}</div>
            )}

            <TeamBlockClient>
                {Array.from({ length: attrs.data.persons }).map((_, index) => (
                    <div key={"team_" + index} className="flex-none w-36 transition-all duration-500 ease-in-out">
                        <Picture
                            id={attrs.data[`persons_${index}_image`]}
                            className="w-24 rounded-full! aspect-square object-cover p-1 border shadow-sm bg-white"
                        />
                        <div>
                            <div className="text-sm font-bold">{attrs.data[`persons_${index}_line1`]}</div>
                            <div className="text-xs">{attrs.data[`persons_${index}_line2`]}</div>
                        </div>
                    </div>
                ))
                }
            </TeamBlockClient >

        </div >
    )

};

const UnderTakingBlock = ({ attrs }: { attrs: any }) => {

    return (
        <div className='bg-light rounded-md shadow-md p-5 flex items-start gap-5'>
            <Picture
                id={attrs.data.icon}
                figureClassName="flex-none flex items-center justify-center h-20! w-20! bg-neutral-300 p-4 rounded-full!"
                className="w-full h-full my-0!"
            />
            <div>
                <h3 className="text-xl font-bold">{attrs.data.title}</h3>
                <p className="text-sm">{attrs.data.content}</p>
            </div>
        </div >
    )

};

const CTABlock = ({ attrs }: { attrs: any }) => {


    return (
        <CallToAction
            title={attrs.data.title}
            description={attrs.data.description}
            button_label={attrs.data.button_label}
            button_link={attrs.data.button_link}
        />
    )
}

const NullBlock = ({ innerHTML, innerBlocks, attrs }: { innerHTML: string; innerBlocks: GutenbergBlock[], attrs: any }) => (
    parse(innerHTML)
);

// Block mapping
const blockMap: {
    [key: string]: React.FC<any>;
} = {
    'core/paragraph': ParagraphBlock,
    'core/image': ImageBlock,
    'core/heading': HeadingBlock,
    'core/group': GroupBlock,
    'core/embed': EmbedBlock,
    'acf/logos': LogosBlock,
    'acf/carousel': CarouselBlock,
    'acf/carousel-label': CarouselLabelBlock,
    'acf/grid-cards': GridCardsBlock,
    'acf/accordion-cards': AccordionCardsBlock,
    'acf/timeline': TimelineBlock,
    'acf/accordion-picture': AccordionPictureBlock,
    'acf/undertaking-card': UnderTakingBlock,
    'acf/cta': CTABlock,
    'acf/team': TeamBlock,

    // null: NullBlock
};

const BlockRenderer = ({ blocks }: { blocks: GutenbergBlock[] | any }) => {

    if (!blocks?.length) return null;

    return (
        <>
            {blocks.map((block: GutenbergBlock, index: number) => {

                const BlockComponent = blockMap[block.blockName ?? 'null'];

                if (BlockComponent) {
                    return (
                        <BlockComponent
                            key={index}
                            innerHTML={block.innerHTML}
                            innerBlocks={block.innerBlocks}
                            attrs={block.attrs}
                        />
                    );
                }

                // Fallback pour les blocs non gérés
                return (
                    <NullBlock
                        key={index}
                        innerHTML={block.innerHTML}
                        innerBlocks={block.innerBlocks}
                        attrs={block.attrs}
                    />
                );
            })}
        </>
    );
};

export default BlockRenderer;

const Picture = async ({ id, className, width, height, figureClassName }: { id: number, className?: string, figureClassName?: string, width?: number, height?: number }) => {
    const media = await getMediaById(id);

    if (!media) return null;
    return (
        <figure className={`overflow-hidden ${figureClassName || ''}`}>
            <Image
                src={media.source_url}
                alt={media.alt_text || 'Image'}
                width={width || media.media_details.width}
                height={media.media_details.height}
                className={className}
                unoptimized={media.mime_type === "image/svg+xml" ? true : false}
            />
        </figure>
    )
}