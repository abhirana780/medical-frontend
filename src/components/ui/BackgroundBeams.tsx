import { motion } from "framer-motion";

export const BackgroundBeams = () => {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            <svg
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    opacity: 0.1
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern
                        id="beams-pattern"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M0 40V.5H40"
                            fill="none"
                            stroke="white"
                            strokeOpacity="0.1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#beams-pattern)" />
            </svg>
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.8))'
            }} />
            <div style={{ position: 'absolute', inset: 0 }}>
                <Beam delay={0} duration={12} x="10%" />
                <Beam delay={2} duration={15} x="30%" />
                <Beam delay={5} duration={18} x="50%" />
                <Beam delay={1} duration={14} x="70%" />
                <Beam delay={4} duration={16} x="90%" />
            </div>
        </div>
    );
};

const Beam = ({ x, delay, duration }: { x: string; delay: number; duration: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0, top: "-10%" }}
            animate={{
                opacity: [0, 0.5, 0],
                height: ["0%", "30%", "0%"],
                top: ["-10%", "110%"],
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "linear",
            }}
            style={{
                position: "absolute",
                left: x,
                width: "2px",
                background: "linear-gradient(to bottom, transparent, #3b82f6, transparent)",
                boxShadow: "0 0 15px #3b82f6",
            }}
        />
    );
};
