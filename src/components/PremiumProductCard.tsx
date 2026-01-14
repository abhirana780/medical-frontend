import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface Product {
    _id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image?: string;
    imageUrl?: string;
    isNewArrival?: boolean;
    isSale?: boolean;
    countInStock?: number;
}

const PremiumProductCard = ({ product, index }: { product: Product, index: number }) => {
    const isOutOfStock = product.countInStock === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="premium-product-card"
            style={{
                background: 'white',
                borderRadius: '1.25rem',
                border: '1px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                height: '100%'
            }}
            whileHover={{
                y: -8,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.12)',
                borderColor: '#E2E8F0'
            }}
        >
            <div style={{ position: 'relative', height: '280px', padding: '1rem', background: '#F8FAFC', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link to={`/product/${product._id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.img
                        src={product.image || product.imageUrl}
                        alt={product.name}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
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
                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                >
                    <Link to={`/product/${product._id}`} style={{ display: 'flex' }}><Zap size={18} color="#64748B" /></Link>
                </motion.button>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Medical Grade
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                    <Link to={`/product/${product._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {product.name}
                    </Link>
                </h3>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>${product.price ? product.price.toFixed(2) : '0.00'}</span>
                        {product.oldPrice && <span style={{ fontSize: '0.8rem', color: '#94A3B8', textDecoration: 'line-through' }}>${product.oldPrice.toFixed(2)}</span>}
                    </div>
                    <Link to={isOutOfStock ? '#' : `/product/${product._id}`}>
                        <motion.button
                            whileHover={isOutOfStock ? {} : { scale: 1.05, backgroundColor: '#1E293B' }}
                            whileTap={isOutOfStock ? {} : { scale: 0.95 }}
                            style={{
                                background: isOutOfStock ? '#E2E8F0' : '#0F172A',
                                color: isOutOfStock ? '#94A3B8' : 'white',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                border: 'none',
                                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {isOutOfStock ? 'Sold Out' : 'View Details'}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PremiumProductCard;
