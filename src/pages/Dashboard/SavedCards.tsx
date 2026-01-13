import { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, X, Lock } from 'lucide-react';

interface Card {
    id: number;
    type: string;
    number: string;
    holder: string;
    expiry: string;
    cvv: string;
    gradient: string;
}

const SavedCards = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [newCard, setNewCard] = useState({
        number: '',
        holder: '',
        expiry: '',
        cvv: ''
    });

    // Load cards from local storage on mount
    useEffect(() => {
        const storedCards = localStorage.getItem('saved_cards');
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        } else {
            // Default mock cards if none exist
            setCards([
                { id: 1, type: 'Visa', number: '4242', holder: 'John Doe', expiry: '12/25', cvv: '123', gradient: 'linear-gradient(135deg, #1E293B, #0F172A)' },
                { id: 2, type: 'Mastercard', number: '8890', holder: 'John Doe', expiry: '09/24', cvv: '456', gradient: 'linear-gradient(135deg, #475569, #334155)' }
            ]);
        }
    }, []);

    // Save to local storage whenever cards change
    useEffect(() => {
        localStorage.setItem('saved_cards', JSON.stringify(cards));
    }, [cards]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;

        // Basic formatting
        if (name === 'number') {
            value = value.replace(/\D/g, '').slice(0, 16); // Only numbers, max 16
        }
        if (name === 'expiry') {
            value = value.length === 2 && newCard.expiry.length === 1 ? value + '/' : value; // Auto slash
            value = value.slice(0, 5);
        }
        if (name === 'cvv') {
            value = value.replace(/\D/g, '').slice(0, 4);
        }

        setNewCard(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (newCard.number.length < 16) return alert("Invalid card number");
        if (!newCard.expiry.includes('/')) return alert("Invalid expiry date");

        const cardType = newCard.number.startsWith('4') ? 'Visa' : 'Mastercard';
        const gradients = [
            'linear-gradient(135deg, #1E293B, #0F172A)',
            'linear-gradient(135deg, #475569, #334155)',
            'linear-gradient(135deg, #0f4c75, #3282b8)',
            'linear-gradient(135deg, #11998e, #38ef7d)'
        ];

        const newItem: Card = {
            id: Date.now(),
            type: cardType,
            number: newCard.number.slice(-4),
            holder: newCard.holder.toUpperCase(),
            expiry: newCard.expiry,
            cvv: newCard.cvv,
            gradient: gradients[Math.floor(Math.random() * gradients.length)]
        };

        setCards([...cards, newItem]);
        setShowForm(false);
        setNewCard({ number: '', holder: '', expiry: '', cvv: '' });
        alert("Card added successfully!");
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to remove this card?")) {
            setCards(cards.filter(c => c.id !== id));
        }
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Saved Cards</h1>
                <button
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? <X size={18} /> : <Plus size={18} />} {showForm ? 'Cancel' : 'Add New Card'}
                </button>
            </div>

            {showForm && (
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Enter Card Details</h3>
                    <form onSubmit={handleAddCard}>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Card Number</label>
                            <div style={{ position: 'relative' }}>
                                <CreditCard size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="0000 0000 0000 0000"
                                    value={newCard.number}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Card Holder Name</label>
                            <input
                                type="text"
                                name="holder"
                                placeholder="JOHN DOE"
                                value={newCard.holder}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ddd' }}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={newCard.expiry}
                                    onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>CVV</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="123"
                                        value={newCard.cvv}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '0.5rem', border: '1px solid #ddd' }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Save Card</button>
                    </form>
                </div>
            )}

            <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
                {cards.map(card => (
                    <div key={card.id} style={{
                        background: card.gradient,
                        color: 'white',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        position: 'relative',
                        aspectRatio: '1.6/1',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <button onClick={() => handleDelete(card.id)} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: 'white', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}>
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {card.type === 'Mastercard' && (
                                    <>
                                        <div style={{ width: '20px', height: '20px', background: '#EB001B', borderRadius: '50%' }}></div>
                                        <div style={{ width: '20px', height: '20px', background: '#F79E1B', borderRadius: '50%', marginLeft: '-10px' }}></div>
                                    </>
                                )}
                                {card.type === 'Visa' && <CreditCard size={32} style={{ opacity: 0.8 }} />}
                            </div>
                            <span style={{ fontSize: '1.2rem', fontWeight: 700, fontStyle: 'italic' }}>{card.type}</span>
                        </div>

                        <div style={{ fontSize: '1.5rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
                            **** **** **** {card.number}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.8, fontSize: '0.9rem' }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Card Holder</div>
                                <div>{card.holder}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Expires</div>
                                <div>{card.expiry}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3 className="mb-4">Recent Transactions</h3>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '1rem', overflow: 'hidden' }}>
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} style={{
                            padding: '1rem 1.5rem',
                            borderBottom: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '40px', height: '40px',
                                    background: '#F1F5F9',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <CreditCard size={20} color="var(--text-muted)" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 500 }}>Payment to MedPlus</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Aug {12 + i}, 2024 at 10:30 AM</div>
                                </div>
                            </div>
                            <span style={{ fontWeight: 600 }}>-$129.00</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavedCards;
