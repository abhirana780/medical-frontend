import { useState } from "react";
import "./FocusCards.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Card = ({
    card,
    index,
    hovered,
    setHovered,
}: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
    return (
        <Link
            to={`/catalog?category=${card.id}`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            style={{
                borderRadius: "1.5rem",
                position: "relative",
                backgroundColor: "#F3F4F6", // gray-100
                overflow: "hidden",
                height: "16rem",
                width: "100%",
                transition: "all 0.3s ease-out",
                boxShadow: hovered !== null && hovered !== index ? "none" : "0 10px 30px -10px rgba(0,0,0,0.2)",
                filter: hovered !== null && hovered !== index ? "blur(4px) scale(0.95) grayscale(100%)" : "none",
                opacity: hovered !== null && hovered !== index ? 0.6 : 1,
                display: "block",
                textDecoration: "none"
            }}
            className="focus-card"
        >
            <img
                src={card.src}
                alt={card.title}
                style={{
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: hovered === index
                        ? "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 60%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0) 50%)",
                    transition: "background 0.3s",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.5rem 1rem",
                }}
            >
                <div style={{ width: '100%' }}>
                    <h3 style={{
                        color: "transparent",
                        backgroundImage: "linear-gradient(to bottom right, #f3f4f6, #9ca3af)", // zinc-100 to zinc-400
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        fontFamily: "var(--font-sans, sans-serif)",
                        marginBottom: "0.25rem"
                    }}>
                        {card.title}
                    </h3>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: hovered === index ? 1 : 0,
                            height: hovered === index ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div style={{
                            color: "#D1D5DB",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            marginBottom: "0.5rem"
                        }}>
                            View →
                        </div>
                    </motion.div>
                </div>
            </div>
        </Link>
    );
};

export function FocusCards({ cards }: { cards: any[] }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1.5rem",
                maxWidth: "1400px",
                margin: "0 auto",
                width: "100%",
                overflowX: "auto",
                padding: "1rem 0"
            }}
            className="focus-cards-row"
        >
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
}
