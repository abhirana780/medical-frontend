import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ShoppingCart, Heart, Check, ArrowLeftRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useCurrency } from '../context/CurrencyContext';
import { useState, useCallback } from 'react';
import { Meteors } from './ui/Meteors';

interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    oldPrice?: number;
    image?: string;
    imageUrl?: string;
    isNewArrival?: boolean;
    isSale?: boolean;
    countInStock?: number;
    rating?: number;
    category?: string;
}

const PremiumProductCard = ({ product, index = 0, viewMode = 'grid' }: { product: Product, index?: number, viewMode?: 'grid' | 'list' }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();
    const { formatPrice } = useCurrency();
    const [isAdded, setIsAdded] = useState(false);

    const isOutOfStock = product.countInStock === 0;
    const inWishlist = isInWishlist(product._id);
    const inCompare = isInCompare(product._id);

    // Spotlight effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }, [mouseX, mouseY]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock) return;
        addToCart(product as any);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product._id);
        } else {
            addToWishlist(product._id);
        }
    };

    const handleToggleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inCompare) {
            removeFromCompare(product._id);
        } else {
            addToCompare(product as any);
        }
    };

    const isFeatured = product.isSale || product.isNewArrival || index % 6 === 0;

    const CardContent = (
        <motion.div
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="premium-product-card group"
            style={{
                background: 'white',
                borderRadius: '1.25rem',
                display: 'flex',
                flexDirection: viewMode === 'list' ? 'row' : 'column',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                height: viewMode === 'list' ? 'auto' : '100%',
                marginBottom: viewMode === 'list' ? '1rem' : '0'
            }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.12)',
            }}
        >
            {/* Spotlight Effect */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: '1.25rem',
                    background: useMotionTemplate`
                        radial-gradient(
                          400px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.08),
                          transparent 80%
                        )
                    `,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Background elements for featured cards */}
            {isFeatured && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    <Meteors number={15} />
                </div>
            )}

            <div style={{
                position: 'relative',
                height: viewMode === 'list' ? '200px' : '280px',
                width: viewMode === 'list' ? '240px' : '100%',
                padding: '1rem',
                background: '#F8FAFC',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 2
            }}>
                <Link to={`/product/${product._id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.img
                        src={product.image || product.imageUrl}
                        alt={product.name}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'contain',
                            mixBlendMode: 'multiply',
                            filter: isOutOfStock ? 'grayscale(100%)' : 'none',
                            opacity: isOutOfStock ? 0.7 : 1
                        }}
                        whileHover={{ scale: isOutOfStock ? 1 : 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                </Link>
                {/* Status Badges */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                    {isOutOfStock ? (
                        <span style={{ background: '#94A3B8', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.02em', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            OUT OF STOCK
                        </span>
                    ) : (
                        <>
                            {product.isNewArrival && (
                                <span style={{ background: '#2563EB', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.02em', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)' }}>
                                    NEW
                                </span>
                            )}
                            {product.isSale && (
                                <span style={{ background: '#EF4444', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.02em', boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)' }}>
                                    SALE
                                </span>
                            )}
                        </>
                    )}
                </div>
                {/* Action Buttons Overlay - Only for Grid View */}
                {viewMode === 'grid' && (
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 20 }}>
                        <motion.button
                            onClick={handleToggleWishlist}
                            whileHover={{ scale: 1.1, background: '#F8FAFC' }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                color: inWishlist ? '#EF4444' : '#64748B'
                            }}
                            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                        </motion.button>
                        <motion.button
                            onClick={handleToggleCompare}
                            whileHover={{ scale: 1.1, background: '#F8FAFC' }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: inCompare ? '#2563EB' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                color: inCompare ? 'white' : '#64748B'
                            }}
                            title={inCompare ? "Remove from Compare" : "Add to Compare"}
                        >
                            <ArrowLeftRight size={18} />
                        </motion.button>
                    </div>
                )}
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', zIndex: 2, background: 'white' }}>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {product.category || 'Medical Grade'}
                </div>
                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#1E293B',
                    marginBottom: '0.75rem',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: viewMode === 'list' ? 'auto' : '3.1rem'
                }}>
                    <Link to={`/product/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {product.name}
                    </Link>
                </h3>

                {viewMode === 'list' && (
                    <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.description || 'Premium quality medical supply for healthcare professionals and patients.'}
                    </p>
                )}

                <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    gap: viewMode === 'list' ? '2rem' : '0'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{product.price ? formatPrice(product.price) : formatPrice(0)}</span>
                        {product.oldPrice && <span style={{ fontSize: '0.8rem', color: '#94A3B8', textDecoration: 'line-through' }}>{formatPrice(product.oldPrice)}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flex: viewMode === 'list' ? 1 : 'none', justifyContent: 'flex-end' }}>
                        <motion.button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            whileHover={isOutOfStock ? {} : { scale: 1.05, backgroundColor: isAdded ? '#16a34a' : '#1E293B' }}
                            whileTap={isOutOfStock ? {} : { scale: 0.95 }}
                            style={{
                                background: isOutOfStock ? '#E2E8F0' : (isAdded ? '#16a34a' : '#0F172A'),
                                color: isOutOfStock ? '#94A3B8' : 'white',
                                padding: '0.65rem 1.25rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                border: 'none',
                                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                minWidth: viewMode === 'list' ? '140px' : '100px',
                                justifyContent: 'center',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {isAdded ? (
                                    <motion.span key="check" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Check size={16} /> Added
                                    </motion.span>
                                ) : (
                                    <motion.span key="cart" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        {isOutOfStock ? 'Empty' : <><ShoppingCart size={16} /> Buy</>}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {viewMode === 'list' && (
                            <>
                                <motion.button
                                    onClick={handleToggleWishlist}
                                    whileHover={{ scale: 1.05, background: '#F8FAFC' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '0.75rem',
                                        background: 'white',
                                        border: `1px solid ${inWishlist ? '#EF4444' : '#E2E8F0'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: inWishlist ? '#EF4444' : '#64748B'
                                    }}
                                >
                                    <Heart size={20} fill={inWishlist ? "currentColor" : "none"} />
                                </motion.button>
                                <motion.button
                                    onClick={handleToggleCompare}
                                    whileHover={{ scale: 1.05, background: '#F8FAFC' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '0.75rem',
                                        background: inCompare ? '#2563EB' : 'white',
                                        border: `1px solid ${inCompare ? '#2563EB' : '#E2E8F0'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: inCompare ? 'white' : '#64748B'
                                    }}
                                >
                                    <ArrowLeftRight size={20} />
                                </motion.button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return CardContent;
};

export default PremiumProductCard;
