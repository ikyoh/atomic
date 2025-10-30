import { getTaxonomy } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";


export async function TagCard({ tagID }: { tagID: number }) {

    const tag = await getTaxonomy(`critere/${tagID}`)

    return (
        <Link href={'slug'} className="rounded-md overflow-clip shadow-sm hover:shadow-md hover:shadow-primary transition-shadow duration-200 aspect-square group relative bg-black dark:bg-white">

            <Image
                src={tag.acf.icon ? tag.acf.icon : '/not-found.png'}
                alt={`icon${tag.name}`}
                width={300}
                height={300}
                className="w-full h-auto max-h-8/10 transition-all group-hover:scale-110 m-0! dark:invert px-3 py-3"
            />

            <div className="absolute bottom-0 w-full p-2 text-center text-[0.6rem] font-bold text-white dark:text-black flex items-center justify-center hover:bg-primary-dark transition-colors duration-200">
                {tag.name}
            </div>
        </Link>
    );
}
