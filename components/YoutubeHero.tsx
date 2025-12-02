
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import Link from "next/link";

export default function YoutubeHero({ youtubeID }: { youtubeID: string }) {

    return (

        <div className={cn("relative w-full h-[calc(100vh-155px)] md:h-[calc(100vh-90px)] bg-black overflow-clip")}>
            <iframe
                className="w-auto h-full sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-auto aspect-video pointer-events-none overflow-clip absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                style={{ containerType: "size" }}
                src={`https://www.youtube.com/embed/${youtubeID}?autoplay=1&loop=1&playlist=${youtubeID}&mute=1&iv_load_policy=3&controls=0&disablekb=1&fs=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <Link href={"#content"} className="z-3 md:hidden animate-bounce flex items-center justify-center text-white size-12 bg-neutral-500/50 rounded-full absolute bottom-35 left-1/2 -translate-x-1/2">
                <ChevronDown />
            </Link>

        </div>



    );
}