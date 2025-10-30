'use client'
import { getMediaById } from '@/lib/wordpress';
import { useEffect, useState } from "react";


const Picture = ({ id, className }: { id: number, className?: string }) => {
    console.log('id', id)
    const [media, setMedia] = useState(null)

    useEffect(() => {
        async function fetchPicture() {
            const media = await getMediaById(id);
            if (!media) return;
            setMedia(media)
        }
        fetchPicture()
    }, [])


    if (!media) return null;
    return (
        <img src={media.source_url} alt={media.alt_text || 'Image'} className={className} />
    )
}

export default Picture;