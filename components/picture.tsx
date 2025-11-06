'use client'
import { getMediaById } from '@/lib/wordpress';
import Image from 'next/image';
import { useEffect, useState } from "react";

interface MediaObject {
    source_url: string;
    alt_text?: string;
}

const Picture = ({ id, className }: { id: number, className?: string }) => {

    const [media, setMedia] = useState<MediaObject | null>(null)

    useEffect(() => {
        async function fetchPicture() {
            const media = await getMediaById(id);
            if (!media) return;
            setMedia(media as any)
        }
        fetchPicture()
    }, [])


    if (!media) return null;
    return (
        <Image src={media.source_url} alt={media.alt_text || 'Image'} width={500} height={500} className={className} />
    )
}

export default Picture;