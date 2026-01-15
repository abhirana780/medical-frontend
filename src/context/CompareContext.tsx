
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import toast from 'react-hot-toast';

interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    category: string;
    description: string;
    brand?: string; // Optional if not always present
    countInStock: number;
}

interface CompareContextType {
    compareList: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: string) => void;
    isInCompare: (productId: string) => boolean;
    clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
    const [compareList, setCompareList] = useState<Product[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('compareList');
        if (stored) {
            setCompareList(JSON.parse(stored));
        }
    }, []);

    const addToCompare = (product: Product) => {
        if (compareList.find(p => p._id === product._id)) {
            toast.error("Product already in compare list");
            return;
        }
        if (compareList.length >= 3) {
            toast.error("You can only compare up to 3 products");
            return;
        }
        const updated = [...compareList, product];
        setCompareList(updated);
        localStorage.setItem('compareList', JSON.stringify(updated));
        toast.success("Added to compare");
    };

    const removeFromCompare = (productId: string) => {
        const updated = compareList.filter(p => p._id !== productId);
        setCompareList(updated);
        localStorage.setItem('compareList', JSON.stringify(updated));
        toast.success("Removed from compare");
    };

    const isInCompare = (productId: string) => {
        return compareList.some(p => p._id === productId);
    };

    const clearCompare = () => {
        setCompareList([]);
        localStorage.removeItem('compareList');
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error("useCompare must be used within a CompareProvider");
    }
    return context;
};
