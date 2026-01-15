
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

interface FreeShippingBarProps {
    currentAmount: number;
    threshold: number;
}

export const FreeShippingBar = ({ currentAmount, threshold }: FreeShippingBarProps) => {
    const progress = Math.min((currentAmount / threshold) * 100, 100);
    const remaining = Math.max(threshold - currentAmount, 0);

    return (
        <div style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ background: '#ecfdf5', padding: '0.5rem', borderRadius: '50%', color: '#10b981' }}>
                    <Truck size={20} />
                </div>
                <div style={{ flexGrow: 1 }}>
                    {remaining > 0 ? (
                        <p style={{ margin: 0, fontWeight: 500, color: '#334155' }}>
                            Add <span style={{ color: '#0f172a', fontWeight: 700 }}>${remaining.toFixed(2)}</span> to qualify for <span style={{ color: '#10b981', fontWeight: 700 }}>Free Shipping</span>!
                        </p>
                    ) : (
                        <p style={{ margin: 0, fontWeight: 700, color: '#10b981' }}>
                            🎉 You've qualified for Free Shipping!
                        </p>
                    )}
                </div>
                <span style={{ fontWeight: 600, color: '#64748B', fontSize: '0.9rem' }}>
                    {Math.round(progress)}%
                </span>
            </div>

            <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        height: '100%',
                        background: remaining > 0 ? 'linear-gradient(90deg, #3b82f6, #2563eb)' : '#10b981',
                        borderRadius: '99px'
                    }}
                />
            </div>
        </div>
    );
};
