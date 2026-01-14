import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingCart, Heart } from 'lucide-react';
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
}

const ProductCard = ({ product, viewMode = 'grid' }: { product: Product, viewMode?: 'grid' | 'list' }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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
        alert(`Added ${product.name} to cart!`);
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
        <div className={`product-card ${viewMode === 'list' ? 'list-mode' : ''} ${isOutOfStock ? 'opacity-75' : ''}`}>
            <div className="product-image" style={{ position: 'relative' }}>
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
                    <Heart size={18} fill={inWishlist ? "#ef4444" : "none"} color={inWishlist ? "#ef4444" : "#64748B"} />
                </button>

                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={handleImageError}
                        style={{ filter: isOutOfStock ? 'grayscale(100%)' : 'none' }}
                    />
                </Link>
            </div>

            <div className="product-info">
                <Link to={`/product/${product._id}`} className="product-title" title={product.name}>
                    {product.name}
                </Link>

                <p className="product-description">
                    {product.description || 'Medical grade quality product.'}
                </p>

                <div className="price-box">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
                </div>

                {product.countInStock !== undefined && product.countInStock > 0 && product.countInStock < 5 && (
                    <div style={{ fontSize: '0.8rem', color: '#eab308', marginBottom: '0.5rem', fontWeight: 500 }}>
                        Only {product.countInStock} left in stock!
                    </div>
                )}

                <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                    <button
                        className="add-cart-btn btn-block"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            width: '100%',
                            background: isOutOfStock ? '#cbd5e1' : undefined,
                            cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isOutOfStock ? 'Out of Stock' : <><ShoppingCart size={16} /> Add to cart</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
