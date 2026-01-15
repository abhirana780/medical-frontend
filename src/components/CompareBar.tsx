
import { useCompare } from '../context/CompareContext';
import { X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CompareBar = () => {
    const { compareList, removeFromCompare, clearCompare } = useCompare();

    if (compareList.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'white',
                    boxShadow: '0 -4px 10px rgba(0,0,0,0.1)',
                    padding: '1rem',
                    zIndex: 100,
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, color: '#0f172a' }}>Compare ({compareList.length}/3):</span>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {compareList.map(p => (
                                <div key={p._id} style={{ position: 'relative', width: '50px', height: '50px', background: '#f8fafc', borderRadius: '0.25rem', padding: '0.25rem' }}>
                                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    <button
                                        onClick={() => removeFromCompare(p._id)}
                                        style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', padding: '0.1rem', cursor: 'pointer', display: 'flex' }}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={clearCompare} style={{ background: 'none', border: 'none', textDecoration: 'underline', color: '#64748B', cursor: 'pointer', fontSize: '0.9rem' }}>
                            Clear All
                        </button>
                        <Link to="/compare" className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                            Compare Products <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CompareBar;
