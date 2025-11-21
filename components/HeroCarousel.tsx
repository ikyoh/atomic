
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroCarousel({ images, title, subtitle, isFullscreen = false, youtubeID }: { images: string[], title?: string, subtitle?: string, isFullscreen?: boolean, youtubeID?: string }) {
    console.log('images', images)
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            isHero
        >
            <CarouselContent className={cn("h-[calc(100vh-155px)] md:h-[445px]")}>
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
                    <CarouselItem key={index} className="h-full w-full relative">
                        <Image
                            src={image}
                            alt={title || "Featured Image"}
                            fill
                            className="rounded-none! mt-0! object-cover"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="z-2 absolute bottom-0 h-1/2 md:h-auto left-0 right-0 flex flex-col items-center justify-start pb-10">
                {title &&
                    <h1 className="px-5 text-[2.5rem] font-black! text-center text-white uppercase text-shadow-primary text-shadow-[0_5px_20px] mb-3">
                        {title}
                    </h1>
                }
                {subtitle &&
                    <div className="px-5 text-lg! font-bold! text-center uppercase text-white">
                        {subtitle}
                    </div>
                }
            </div>

            <Link href={"#content"} className="md:hidden animate-bounce flex items-center justify-center text-white size-12 bg-neutral-500/50 rounded-full absolute bottom-25 -translate-x-1/2 left-1/2">
                <ChevronDown />
            </Link>
            <CarouselPrevious className="ml-10 md:ml-60 scale-200 text-white" />
            <CarouselNext className="mr-10 md:mr-60 scale-200 text-white" />
        </Carousel >

    );
}