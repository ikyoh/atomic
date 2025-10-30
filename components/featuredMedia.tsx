import { FeaturedMedia as MediaType } from "@/lib/wordpress.d";

export default function FeaturedMedia({ media }: { media?: MediaType }) {


    return (

        <div className="w-full h-[calc(100vh-155px)] md:h-[485px] bg-cover bg-no-repeat bg-center"
            style={{
                backgroundImage: `url(${media})`
            }}>
        </div>
    )
}

