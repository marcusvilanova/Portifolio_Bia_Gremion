import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
}

export const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(({ src, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Expose the internal video element to the parent ref
    useImperativeHandle(ref, () => videoRef.current!);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsLoaded(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '200px', // More generous margin
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
            observer.disconnect();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            src={isLoaded ? src : undefined}
            {...props}
        >
            {isLoaded ? props.children : null}
        </video>
    );
});

LazyVideo.displayName = 'LazyVideo';
