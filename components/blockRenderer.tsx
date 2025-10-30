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
    <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
);

const ImageBlock = ({ innerHTML }: { innerHTML: string }) => (
    <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
);

const HeadingBlock = ({ innerHTML }: { innerHTML: string }) => {
    const match = innerHTML.match(/<(h[1-6])([^>]*)>(.*?)<\/h[1-6]>/is);
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

const EmbedBlock = ({ attrs }: { attrs: GutenbergBlock["attrs"] }) => {

    if (attrs && attrs.type === 'video' && attrs.providerNameSlug === "youtube")
        return <div className="relative overflow-hidden aspect-video mb-5">
            <iframe className='absolute top-0 left-0 w-full h-full' width="560" height="315" src="https://www.youtube.com/embed/PP2Bea1WHcI?si=M4hJrFoFF8e1lIWz" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    return <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
};

const GroupBlock = ({ innerHTML, innerBlocks, attrs, innerContent }: { innerHTML: string; innerBlocks: GutenbergBlock[], attrs: GutenbergBlock["attrs"] }) => {

    const className = innerHTML.match(/class="([^"]*)"/)?.[1] || '';
    const id = innerHTML.match(/id="([^"]*)"/)?.[1] || '';
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
        <TagName id={id} className={className}>
            <BlockRenderer blocks={innerBlocks} />
        </TagName>
    )
}

const LogosBlock = ({ attrs }: { attrs: object }) => {


    if (!attrs.data.logos) return null

    return (
        <div className="overflow-hidden relative max-w-screen group mb-0">
            <div className="relative">
                <InfiniteSlider
                    speed={40}
                    gap={60}
                    reverse={attrs.data.is_reverse === "0" ? false : true}>

                    {
                        attrs.data.logos?.map((logo: { id: number }, index: number) => (
                            <div key={"logos_" + index} className="flex">

                                <div className="flex items-center space-x-4">
                                    <Picture id={logo} className="w-12 h-auto" />
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

const CarouselBlock = ({ attrs }: { attrs: object }) => {

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

                            <Picture id={attrs.data[`cards_${index}_image`]} className="aspect-3/2 rounded-none! mt-0!" />

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

const GridCardsBlock = ({ attrs }: { attrs: object }) => {

    return (

        <div className="flex flex-col gap-8">

            {Array.from({ length: attrs.data.blocks }).map((_, index) => (
                <div key={"gridcards_" + index} className="rounded-2xl bg-neutral-200 dark:bg-neutral-900 overflow-hidden min-h-[280px] md:grid md:grid-cols-2 shadow-md">
                    <div className={`overflow-hidden ${index % 2 === 1 && 'order-last'
                        }`}>
                        <Picture
                            id={attrs.data[`blocks_${index}_image`]}
                            className={`hover:scale-125 transition-transform cover rounded-none! w-full! md:h-full! h-[280px]! mt-0! ${index % 2 === 1 && 'order-last'
                                }`}
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

const AccordionCardsBlock = ({ attrs }: { attrs: object }) => {

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

const AccordionPictureBlock = ({ attrs }: { attrs: object }) => {

    return (
        <div className='flex items-center justify-center'>
            <Accordion type="single" collapsible defaultValue="item-0">
                <Tabs defaultValue="item-0" className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center" orientation="vertical">
                    <TabsList className="space-y-2 h-auto bg-background">
                        {Array.from({ length: attrs.data.blocks }).map((_, index) => (
                            <AccordionItem value={"item-" + index} key={"AccordionPictureBlockItem" + index} className="bg-primary data-[state=open]:bg-white data-[state=open]:border data-[state=open]:border-primary rounded-sm">
                                <AccordionTrigger className="font-bold not-data-[state=open]:text-white data-[state=open]:text-primary" asChild>
                                    <TabsTrigger value={"item-" + index} className="h-full py-2 uppercase">
                                        {attrs.data[`blocks_${index}_title`]}
                                    </TabsTrigger>
                                </AccordionTrigger>
                                <AccordionContent className="px-3 text-black">
                                    <div className="font-bold text-sm leading-4 mb-1">
                                        {attrs.data[`blocks_${index}_subtitle`]}
                                    </div>
                                    <p className="text-sm! leading-4! mb-0!">
                                        {attrs.data[`blocks_${index}_content`]}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                        }

                    </TabsList>
                    <div className="bg-black rounded-3xl p-5 flex-none w-full md:w-[380px] h-[600px] relative">
                        <div className='absolute top-5 left-1/2 -translate-x-1/2 rounded-b-3xl border-b border-white/50 w-40 h-7 bg-black'>
                            <div className='rounded-full bg-blue-500/20 border border-white/20 h-3 w-3 absolute top-2 left-1/2 -translate-x-1/2'></div>
                        </div>
                        <div className="absolute bg-black -left-1 top-15 rounded-3xl w-3 h-15"></div>
                        <div className="absolute bg-black -left-1 top-35 rounded-3xl w-3 h-15"></div>
                        <div className="absolute bg-black -right-1 top-15 rounded-3xl w-3 h-25"></div>
                        {Array.from({ length: attrs.data.blocks }).map((_, index) => (
                            <TabsContent key={"tabcontent-" + index} value={"item-" + index} className="h-full w-full">
                                <Picture
                                    id={attrs.data[`blocks_${index}_image`]}
                                    className="object-cover w-full! h-full! mt-0! border border-white/50"
                                />
                            </TabsContent>
                        ))}
                    </div>
                </Tabs >
            </Accordion >
        </div>
    )

};

const TimelineBlock = ({ attrs }: { attrs: object }) => {

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
                className='h-20 w-20 bg-neutral-300 p-3 rounded-full! my-0!'
            />
            <div>
                <h3 className="text-xl font-bold">{attrs.data.title}</h3>
                <p className="text-sm">{attrs.data.content}</p>
            </div>
        </div >
    )

};

const CTABlock = ({ attrs }: { attrs: object }) => {

    console.log('attrs', attrs)
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
    'acf/grid-cards': GridCardsBlock,
    'acf/accordion-cards': AccordionCardsBlock,
    'acf/timeline': TimelineBlock,
    'acf/accordion-picture': AccordionPictureBlock,
    'acf/undertaking-card': UnderTakingBlock,
    'acf/cta': CTABlock,
    'acf/team': TeamBlock,

    // null: NullBlock
};

const BlockRenderer: React.FC<{ blocks: GutenbergBlock[] }> = ({ blocks }) => {

    if (!blocks?.length) return null;

    console.log('blocks', blocks)
    return (
        <>
            {blocks.map((block, index) => {

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


const Picture = async ({ id, className }: { id: number, className?: string }) => {
    const media = await getMediaById(id);
    if (!media) return null;
    return (
        <img src={media.source_url} alt={media.alt_text || 'Image'} className={className} />
    )
}