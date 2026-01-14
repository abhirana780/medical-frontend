import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
    children,
    animate = true,
}: {
    children?: React.ReactNode;
    animate?: boolean;
}) => {
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
        },
    };
    return (
        <div style={{ position: 'relative', padding: '1px' }}>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1.5rem',
                    zIndex: 0,
                    opacity: 0.6,
                    filter: 'blur(10px)',
                    transition: 'opacity 0.5s',
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #f43f5e)",
                    backgroundSize: "400% 400%",
                }}
            />
            <motion.div
                variants={animate ? variants : undefined}
                initial={animate ? "initial" : undefined}
                animate={animate ? "animate" : undefined}
                transition={
                    animate
                        ? {
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }
                        : undefined
                }
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '1.5rem',
                    zIndex: 0,
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #f43f5e)",
                    backgroundSize: "400% 400%",
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    borderRadius: '1.5rem',
                    background: 'white',
                    height: '100%',
                }}
            >
                {children}
            </div>
        </div>
    );
};
