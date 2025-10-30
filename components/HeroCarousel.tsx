
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function HeroCarousel({ images, title, subtitle, isFullscreen = false, youtubeID }: { images: string[], title?: string, subtitle?: string, isFullscreen?: boolean, youtubeID?: string }) {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            isHero
        >
            <CarouselContent className={cn(isFullscreen ? "h-[calc(100vh-90px)]" : "h-[485px]")}>
                {youtubeID &&
                    <CarouselItem className="h-full w-full overflow-clip">
                        <iframe
                            className="w-auto md:w-full h-full md:h-auto aspect-video pointer-events-none overflow-clip
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ containerType: "size" }}
                            src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&loop=1&playlist=${youtubeID}&mute=1&iv_load_policy=3&controls=0&disablekb=1&fs=0`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </CarouselItem>
                }
                {images.map((image, index) => (
                    <CarouselItem key={index} className="h-full w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                        <div>

                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="absolute -translate-y-full -translate-x-1/2 left-1/2 pb-5">
                {title &&
                    <h1 className="relative px-5 text-[2.5rem] font-black! text-center text-white uppercase text-shadow-primary text-shadow-[0_5px_20px] mb-3">
                        {title}
                    </h1>
                }
                {subtitle &&
                    <div className="px-5 text-lg! font-bold! text-center uppercase text-white">
                        {subtitle}
                    </div>
                }
            </div>
            <CarouselPrevious className="ml-10 md:ml-60 scale-200 text-white" />
            <CarouselNext className="mr-10 md:mr-60 scale-200 text-white" />
        </Carousel >

    );
}