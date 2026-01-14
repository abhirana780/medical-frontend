import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

interface WishlistContextType {
    wishlist: string[];
    addToWishlist: (productId: string) => Promise<void>;
    removeFromWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
    loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchWishlistIds();
        } else {
            setWishlist([]);
        }
    }, [user]);

    const fetchWishlistIds = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/users/wishlist');
            // Extract IDs from product objects
            setWishlist(res.data.map((p: any) => p._id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId: string) => {
        if (!user) {
            alert("Please login to use wishlist");
            return;
        }
        try {
            await api.post(`/api/users/wishlist/${productId}`);
            setWishlist((prev) => [...prev, productId]);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromWishlist = async (productId: string) => {
        if (!user) return;
        try {
            await api.delete(`/api/users/wishlist/${productId}`);
            setWishlist((prev) => prev.filter((id) => id !== productId));
        } catch (error) {
            console.error(error);
        }
    };

    const isInWishlist = (productId: string) => {
        return wishlist.includes(productId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, loading }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
