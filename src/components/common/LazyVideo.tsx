import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    poster?: string;
}

export const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(({ src, poster, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useImperativeHandle(ref, () => videoRef.current!);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsLoaded(true);
                if (observerRef.current) observerRef.current.disconnect();
            }
        }, { rootMargin: '200px' });

        if (videoRef.current) observerRef.current.observe(videoRef.current);
        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    return (
        <video 
            ref={videoRef} 
            src={isLoaded ? src : undefined} 
            poster={poster}
            {...props} 
        />
    );
});

LazyVideo.displayName = 'LazyVideo';
