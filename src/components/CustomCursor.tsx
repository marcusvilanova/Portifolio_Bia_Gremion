import { useEffect, useState, useRef } from 'react';
import { gsap } from '../lib/gsap';

import '../styles/components/_custom_cursor.scss';

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [isEnabled, setIsEnabled] = useState(false);
    
    useEffect(() => {
        // Only enable custom cursor on devices with a fine pointer (mouse)
        const hasFineMouse = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
        if (!hasFineMouse) return;
        
        setIsEnabled(true);
        
        // Wait for next tick to ensure ref is populated after setIsEnabled(true)
        const timeout = setTimeout(() => {
            const cursor = cursorRef.current;
            const text = textRef.current;
            if (!cursor) return;

            // Move cursor with magnetic effect if near a target
            const moveCursor = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                const magneticTarget = target.closest('.magnetic-target') as HTMLElement;

                if (magneticTarget) {
                    const rect = magneticTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    // Stick to center if over target
                    gsap.to(cursor, {
                        x: centerX,
                        y: centerY,
                        scale: 2.5,
                        duration: 0.3,
                        ease: 'power3.out'
                    });
                    cursor.classList.add('is-magnetic');
                } else {
                    gsap.to(cursor, {
                        x: e.clientX,
                        y: e.clientY,
                        scale: 1,
                        duration: 0.1,
                        ease: 'power2.out'
                    });
                    cursor.classList.remove('is-magnetic');
                }
            };

            // Detect hover on specific elements (like gallery images or links)
            const handleMouseOver = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                const isGallery = target.closest('.gallery-item');
                const isInteractive = target.closest('a') || target.closest('button') || target.closest('.nav-link');

                if (isGallery) {
                    cursor.classList.add('hover-view');
                    if (text) text.style.opacity = '1';
                } else if (isInteractive) {
                    cursor.classList.add('hover-interactive');
                }
            };

            const handleMouseOut = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                const isGallery = target.closest('.gallery-item');
                const isInteractive = target.closest('a') || target.closest('button') || target.closest('.nav-link');

                if (isGallery) {
                    cursor.classList.remove('hover-view');
                    if (text) text.style.opacity = '0';
                } else if (isInteractive) {
                    cursor.classList.remove('hover-interactive');
                }
            };

            window.addEventListener('mousemove', moveCursor);
            document.addEventListener('mouseover', handleMouseOver);
            document.addEventListener('mouseout', handleMouseOut);

            // Hide default cursor on body
            document.body.style.cursor = 'none';

            return () => {
                window.removeEventListener('mousemove', moveCursor);
                document.removeEventListener('mouseover', handleMouseOver);
                document.removeEventListener('mouseout', handleMouseOut);
                document.body.style.cursor = 'auto';
            };
        }, 0);

        return () => clearTimeout(timeout);
    }, []);

    if (!isEnabled) return null;

    return (
        <div ref={cursorRef} className="custom-cursor">
            <span ref={textRef} className="cursor-text" style={{ opacity: 0 }}>VIEW</span>
        </div>
    );
};

