import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
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
}

const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart } = useCart();

    // ... rest of function

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/400x400/e2e8f0/1e293b?text=Image+Unavailable';
        e.currentTarget.onerror = null; // Prevent infinite loop
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        // Optional: Add toast or visual success indicator here
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div className="product-card">
            <div className="product-image">
                {product.isNewArrival && <span className="badge badge-new">New</span>}
                {product.isSale && <span className="badge badge-sale">SALE</span>}

                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={handleImageError}
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

                <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                    <button
                        className="add-cart-btn btn-block"
                        onClick={handleAddToCart}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                    >
                        <ShoppingCart size={16} /> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
