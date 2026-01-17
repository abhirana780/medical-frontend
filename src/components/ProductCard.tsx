import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useCurrency } from '../context/CurrencyContext';
import { ShoppingCart, Heart, Eye, Check, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './ProductCard.css';

interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    oldPrice?: number;
    image: string;
    isNewArrival?: boolean;
    isSale?: boolean;
    countInStock?: number;
    rating?: number;
    category?: string;
}

const ProductCard = ({ product, viewMode = 'grid' }: { product: Product, viewMode?: 'grid' | 'list' }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCompare, isInCompare, removeFromCompare } = useCompare();
    const { formatPrice } = useCurrency();
    const [isHovered, setIsHovered] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const inWishlist = isInWishlist(product._id);
    const isOutOfStock = product.countInStock === 0;

    // Hotfix: Override known broken image for demo until backend restarts
    if (product.name === 'Hill-Rom Versa Care Bed' && product.image.includes('1516574187841')) {
        product.image = 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=600'; // Hospital Bed
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=Image+Unavailable';
        e.currentTarget.onerror = null; // Prevent infinite loop
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock) return;
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000); // Reset after 2s
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

    return (
        <motion.div
            className={`product-card ${viewMode === 'list' ? 'list-mode' : ''} ${isOutOfStock ? 'opacity-75' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            transition={{ duration: 0.3 }}
        >
            <div className="product-image" style={{ position: 'relative', overflow: 'hidden' }}>
                {product.isNewArrival && !isOutOfStock && <span className="badge badge-new">New</span>}
                {product.isSale && !isOutOfStock && <span className="badge badge-sale">SALE</span>}
                {isOutOfStock && <span className="badge badge-out">Out of Stock</span>}

                <button
                    className="wishlist-btn-overlay"
                    onClick={handleToggleWishlist}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                        background: 'white',
                        borderRadius: '50%',
                        padding: '6px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <motion.div
                        key={inWishlist ? "filled" : "empty"}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 1.5 }}
                    >
                        <Heart size={18} fill={inWishlist ? "#ef4444" : "none"} color={inWishlist ? "#ef4444" : "#64748B"} />
                    </motion.div>
                </button>

                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        onError={handleImageError}
                        style={{ filter: isOutOfStock ? 'grayscale(100%)' : 'none' }}
                    />
                </Link>

                {/* Quick View Overlay */}
                <AnimatePresence>
                    {isHovered && !isOutOfStock && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '90%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Trigger Quick View Modal (Future Imp)
                                    // For now just navigate with a fancy effect? Or just show it exists
                                }}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(4px)',
                                    color: '#0f172a',
                                    border: '1px solid #e2e8f0',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '2rem',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <Eye size={16} /> Quick View
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    isInCompare(product._id) ? removeFromCompare(product._id) : addToCompare(product as any);
                                }}
                                className="btn btn-primary"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: isInCompare(product._id) ? '#2563eb' : 'white',
                                    color: isInCompare(product._id) ? 'white' : '#1e293b',
                                    border: isInCompare(product._id) ? 'none' : '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' // Added shadow for consistency
                                }}
                                title={isInCompare(product._id) ? "Remove from Compare" : "Add to Compare"}
                            >
                                <ArrowLeftRight size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="product-info">
                <Link to={`/product/${product._id}`} className="product-title" title={product.name}>
                    {product.name}
                </Link>

                <p className="product-description">
                    {product.description || 'Medical grade quality product.'}
                </p>

                <div className="price-box">
                    <span className="current-price">{formatPrice(product.price)}</span>
                    {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
                </div>

                {product.countInStock !== undefined && product.countInStock > 0 && product.countInStock < 5 && (
                    <div style={{ fontSize: '0.8rem', color: '#eab308', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Only {product.countInStock} left in stock!
                    </div>
                )}

                <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                    <motion.button
                        className="add-cart-btn btn-block"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        whileTap={{ scale: 0.95 }}
                        animate={isAdded ? { backgroundColor: '#16a34a', borderColor: '#16a34a' } : {}}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            width: '100%',
                            background: isOutOfStock ? '#cbd5e1' : undefined,
                            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                            overflow: 'hidden'
                        }}
                    >
                        <AnimatePresence mode='wait'>
                            {isAdded ? (
                                <motion.span
                                    key="check"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Check size={18} /> Added
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="cart"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    {isOutOfStock ? 'Out of Stock' : <><ShoppingCart size={16} /> Add to cart</>}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
