'use client'
import { getMediaById } from '@/lib/wordpress';
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
        <img src={media.source_url} alt={media.alt_text || 'Image'} className={className} />
    )
}

export default Picture;