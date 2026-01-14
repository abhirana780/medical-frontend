import React, { useEffect, useRef, useState } from 'react';

export const InfiniteSlider = ({
    children,
    speed = 40,
}: {
    children: React.ReactNode;
    speed?: number;
}) => {
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.scrollWidth / 2);
        }
    }, [children]);

    return (
        <div style={{
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            padding: '2rem 0'
        }}>
            {/* Fade overlays for smooth edges */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 10,
                background: 'linear-gradient(to right, white, transparent 15%, transparent 85%, white)',
                pointerEvents: 'none'
            }} />

            <style>
                {`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-${containerWidth}px); }
                }
                .infinite-slider-track {
                    animation: scroll ${speed}s linear infinite;
                }
                .infinite-slider-track.paused {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div
                ref={containerRef}
                className={`infinite-slider-track ${isHovered ? 'paused' : ''}`}
                style={{
                    display: 'flex',
                    gap: '2.5rem',
                    width: 'max-content',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Double the children to create infinite effect */}
                {children}
                {children}
            </div>
        </div>
    );
};
