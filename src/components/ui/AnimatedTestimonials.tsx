import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 py-20 font-sans">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="lg:grid-cols-2">
                <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                    <AnimatePresence>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.src}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: -100,
                                    rotate: randomRotateY(),
                                }}
                                animate={{
                                    opacity: isActive(index) ? 1 : 0.7,
                                    scale: isActive(index) ? 1 : 0.95,
                                    z: isActive(index) ? 0 : -100,
                                    rotate: isActive(index) ? 0 : randomRotateY(),
                                    zIndex: isActive(index)
                                        ? 999
                                        : testimonials.length + 2 - index,
                                    y: isActive(index) ? [0, -80, 0] : 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: 100,
                                    rotate: randomRotateY(),
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    originX: 'center',
                                    originY: 'center',
                                }}
                            >
                                <img
                                    src={testimonial.src}
                                    alt={testimonial.name}
                                    draggable={false}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: '2rem',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem 0' }}>
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                            {testimonials[active].name}
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#64748B', marginTop: '0.25rem' }}>
                            {testimonials[active].designation}
                        </p>
                        <motion.p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#475569', marginTop: '2rem' }}>
                            {testimonials[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    style={{ display: 'inline-block' }}
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                        <button
                            onClick={handlePrev}
                            style={{
                                height: '3rem', width: '3rem', borderRadius: '50%', background: '#F1F5F9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                            className="group/prev"
                        >
                            <ArrowLeft style={{ height: '1.25rem', width: '1.25rem', color: '#0F172A', transition: 'transform 0.3s' }} className="group-hover/prev:-rotate-12" />
                        </button>
                        <button
                            onClick={handleNext}
                            style={{
                                height: '3rem', width: '3rem', borderRadius: '50%', background: '#F1F5F9',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                            className="group/next"
                        >
                            <ArrowRight style={{ height: '1.25rem', width: '1.25rem', color: '#0F172A', transition: 'transform 0.3s' }} className="group-hover/next:rotate-12" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
