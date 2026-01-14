import { motion } from 'framer-motion';
import { useState } from 'react';

export const AnimatedGradientBackground = () => {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 0,
        }}>
            {/* Beautiful Animated Gradient Orbs - More visible */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-40%',
                    left: '-25%',
                    width: '70%',
                    height: '70%',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    x: [0, 80, 0],
                    y: [0, 60, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '-40%',
                    right: '-25%',
                    width: '70%',
                    height: '70%',
                    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    x: [0, -80, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.25, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                style={{
                    position: 'absolute',
                    top: '30%',
                    right: '20%',
                    width: '50%',
                    height: '50%',
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
                    filter: 'blur(90px)',
                }}
                animate={{
                    x: [0, -60, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};

export const GridPattern = () => {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            opacity: 0.08,
        }}>
            <svg width="100%" height="100%">
                <defs>
                    <pattern
                        id="grid"
                        width="50"
                        height="50"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 50 0 L 0 0 0 50"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
};

export const FloatingParticles = () => {
    const [particles] = useState(() =>
        Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 8 + 12,
            delay: Math.random() * 5,
        }))
    );

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            overflow: 'hidden',
        }}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    style={{
                        position: 'absolute',
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.4))',
                        boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)',
                    }}
                    animate={{
                        y: [0, -120, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

export const WaveAnimation = () => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '150px',
            zIndex: 1,
            opacity: 0.1,
        }}>
            <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                style={{ width: '100%', height: '100%' }}
            >
                <motion.path
                    d="M0,60 C300,100 500,20 600,60 C700,100 900,20 1200,60 L1200,120 L0,120 Z"
                    fill="url(#waveGradient)"
                    animate={{
                        d: [
                            "M0,60 C300,100 500,20 600,60 C700,100 900,20 1200,60 L1200,120 L0,120 Z",
                            "M0,80 C300,40 500,100 600,80 C700,40 900,100 1200,80 L1200,120 L0,120 Z",
                            "M0,60 C300,100 500,20 600,60 C700,100 900,20 1200,60 L1200,120 L0,120 Z",
                        ],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
