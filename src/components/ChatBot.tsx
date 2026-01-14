import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './ChatBot.css';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    products?: any[];
    actionLink?: string;
    actionText?: string;
}

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hi! I'm your AI assistant. Ask me about products like 'gloves' or 'walkers'.", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');
        setIsTyping(true);

        try {
            const lowerInput = userMsg.toLowerCase();

            // Common greetings/questions
            if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "Hello! How can I help you today? You can search for products or ask about shipping.", sender: 'bot' }]);
                    setIsTyping(false);
                }, 500);
                return;
            }

            if (lowerInput.includes('shipping') || lowerInput.includes('delivery')) {
                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "We offer standard shipping (3-5 days). Free shipping on orders over $500.", sender: 'bot' }]);
                    setIsTyping(false);
                }, 500);
                return;
            }

            // Product Search
            const { data } = await api.get(`/api/products?search=${encodeURIComponent(userMsg)}`);

            if (data && data.length > 0) {
                const topProducts = data.slice(0, 3);

                setMessages(prev => [...prev, {
                    text: `I found ${data.length} products matching "${userMsg}". Here are the top results:`,
                    sender: 'bot',
                    products: topProducts,
                    actionLink: `/catalog?search=${encodeURIComponent(userMsg)}`,
                    actionText: "View All Results"
                }]);
            } else {
                setMessages(prev => [...prev, { text: `I couldn't find any products matching "${userMsg}". Try searching for categories like 'Orthopedics' or 'Personal Care'.`, sender: 'bot' }]);
            }

        } catch (error) {
            console.error("ChatBot Error:", error);
            setMessages(prev => [...prev, { text: "I'm having trouble connecting to the store database. Please try again.", sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chatbot-container">
            {/* Chat Trigger Button */}
            <button
                className={`chatbot-trigger ${isOpen ? 'hidden' : ''}`}
                onClick={toggleChat}
                aria-label="Open Chat"
            >
                <div className="chatbot-icon-pulse"></div>
                <MessageCircle size={28} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="flex items-center gap-2">
                            <span className="chatbot-avatar">AI</span>
                            <span className="font-bold">Health Assistant</span>
                        </div>
                        <button onClick={toggleChat} className="chatbot-close">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.sender}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                    {msg.products && (
                                        <div className="flex flex-col gap-2 mt-2 mb-2">
                                            {msg.products.map((p: any) => (
                                                <div key={p._id} className="chat-product-card" onClick={() => navigate(`/product/${p._id}`)}>
                                                    <img src={p.image} alt={p.name} className="chat-product-image" />
                                                    <div className="chat-product-info">
                                                        <p className="chat-product-name">{p.name}</p>
                                                        <p className="chat-product-price">${p.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {msg.actionLink && (
                                        <button
                                            onClick={() => { navigate(msg.actionLink!); setIsOpen(false); }}
                                            className="chat-action-btn"
                                        >
                                            {msg.actionText}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-bubble text-gray-400 italic">
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbot-input" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="send-btn" disabled={!input.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
