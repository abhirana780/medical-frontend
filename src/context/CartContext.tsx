import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any, qty?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: any, qty = 1) => {
        console.log("Adding to cart:", product, "Qty:", qty);

        if (!product || (!product._id && !product.id)) {
            console.error("Invalid product data passed to addToCart");
            return;
        }

        const productId = product._id || product.id;
        // Determine image safely
        const img = product.image
            || (product.images && product.images.length > 0 ? product.images[0] : '')
            || 'https://via.placeholder.com/150';

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === productId);
            if (existingItem) {
                console.log("Updating quantity for existing item");
                return prevCart.map(item =>
                    item._id === productId
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            console.log("Adding new item to cart");
            return [...prevCart, {
                _id: productId,
                name: product.name,
                price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
                image: img,
                quantity: qty
            }];
        });
    };

    const removeFromCart = (id: string) => {
        console.log("Removing from cart:", id);
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    };

    const updateQuantity = (id: string, qty: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item._id === id ? { ...item, quantity: Math.max(1, qty) } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
