import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface HeroVideoDialogProps {
    videoSrc: string;
    thumbnailSrc: string;
    className?: string;
    animationStyle?: 'from-center' | 'from-bottom' | 'fade';
}

export default function HeroVideoDialog({
    videoSrc,
    thumbnailSrc,
    className,
    animationStyle = 'from-center',
}: HeroVideoDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const variants = {
        'from-center': {
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.5, opacity: 0 },
        },
        'from-bottom': {
            initial: { y: 100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 100, opacity: 0 },
        },
        'fade': {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
        },
    };

    return (
        <div className={className}>
            <div
                className="relative cursor-pointer group rounded-xl overflow-hidden shadow-2xl border border-white/10"
                style={{ zIndex: 10, position: 'relative' }}
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={thumbnailSrc}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/30 shadow-lg">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white translate-x-1" />
                    </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-white/10" />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
                        style={{ zIndex: 9999 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            variants={variants[animationStyle]}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
                                onClick={() => setIsOpen(false)}
                            >
                                <X size={24} />
                            </button>
                            <iframe
                                src={videoSrc}
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
