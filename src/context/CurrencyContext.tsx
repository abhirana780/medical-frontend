
import { createContext, useContext, useState, type ReactNode } from 'react';

type CurrencyCode = 'USD' | 'XCD' | 'TTD' | 'EUR';

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (currency: CurrencyCode) => void;
    formatPrice: (priceInUsd: number) => string;
    exchangeRates: Record<CurrencyCode, number>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Approximate exchange rates relative to USD (1.0)
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
    USD: 1.0,
    XCD: 2.70, // East Caribbean Dollar ~2.70
    TTD: 6.75, // Trinidad & Tobago Dollar ~6.75
    EUR: 0.92, // Euro ~0.92
};

const SYMBOLS: Record<CurrencyCode, string> = {
    USD: '$',
    XCD: 'EC$',
    TTD: 'TT$',
    EUR: '€'
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    // Try to recover from local storage or default to USD
    const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
        const stored = localStorage.getItem('medical_currency');
        return (stored && Object.keys(EXCHANGE_RATES).includes(stored)) ? (stored as CurrencyCode) : 'USD';
    });

    const setCurrency = (c: CurrencyCode) => {
        setCurrencyState(c);
        localStorage.setItem('medical_currency', c);
    };

    const formatPrice = (priceInUsd: number) => {
        const rate = EXCHANGE_RATES[currency];
        const converted = priceInUsd * rate;
        const symbol = SYMBOLS[currency];

        // Use standard locale formatting
        return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRates: EXCHANGE_RATES }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
