import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, X, Maximize2, Minimize2, Sparkles, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

const AIAssistant = ({ products, addToCart, setSelectedProduct, setView }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Xin chào! Tôi là LuxAI, trợ lý ảo cao cấp của LUXLIFE. Tôi có thể giúp bạn tìm kiếm, thêm vào giỏ hàng hoặc xem chi tiết các sản phẩm nội thất. Bạn đang quan tâm đến điều gì?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const API_KEY = "AIzaSyA80MPspNbJZqbt7izokfe0otpkY3HMGNA"; //api AI tự thay nhé

    const handleAction = (text) => {
        const lowerText = text.toLowerCase();
        
        // Check for tags in the AI response or keywords
        // Action: Add to Cart
        if (lowerText.includes('[add_to_cart:') || lowerText.includes('thêm') || lowerText.includes('mua')) {
            const match = lowerText.match(/\[add_to_cart:(.*?)\]/);
            const productId = match ? match[1] : null;
            const product = productId 
                ? products.find(p => p.id.toString() === productId)
                : products.find(p => lowerText.includes(p.name.toLowerCase()));

            if (product) {
                addToCart(product, 1);
                return {
                    success: true,
                    type: 'cart',
                    message: `Đã thêm **${product.name}** vào giỏ hàng!`,
                    actionText: 'Xem Giỏ Hàng',
                    action: () => { setIsOpen(false); }
                };
            }
        }

        // Action: View Product Detail
        if (lowerText.includes('[view_product:') || lowerText.includes('xem chi tiết')) {
            const match = lowerText.match(/\[view_product:(.*?)\]/);
            const productId = match ? match[1] : null;
            const product = productId 
                ? products.find(p => p.id.toString() === productId)
                : products.find(p => lowerText.includes(p.name.toLowerCase()));

            if (product) {
                setSelectedProduct(product);
                return {
                    success: true,
                    type: 'view',
                    message: `Đang mở chi tiết **${product.name}**...`,
                    actionText: 'Xem Ngay',
                    action: () => setSelectedProduct(product)
                };
            }
        }

        if (lowerText.includes('thanh toán')) { setView('checkout'); return { success: true, message: 'Đang đến trang thanh toán...' }; }
        return null;
    };

    const callGemini = async (userPrompt) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
        
        const systemInstruction = `Bạn là LuxAI, trợ lý ảo cao cấp của cửa hàng nội thất LUXLIFE.
        Danh sách sản phẩm hiện có: ${products.map(p => `${p.name} (ID: ${p.id}, Giá: ${p.price})`).join(', ')}.
        
        QUY TẮC PHẢN HỒI:
        1. Luôn lịch sự, sang trọng.
        2. Nếu khách muốn mua/thêm sản phẩm vào giỏ, hãy trả lời và kèm theo tag [ADD_TO_CART:ID_SẢN_PHẨM] vào cuối câu.
        3. Nếu khách muốn xem chi tiết sản phẩm, kèm theo tag [VIEW_PRODUCT:ID_SẢN_PHẨM] vào cuối câu.
        4. Nếu khách muốn thanh toán, hãy nhắc khách bấm nút hoặc bạn có thể nói bạn đang chuyển hướng họ.
        5. Trả lời bằng tiếng Việt.`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `${systemInstruction}\n\nKhách hàng: ${userPrompt}` }] }]
                })
            });
            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Gemini Error:", error);
            return "Xin lỗi, tôi đang gặp chút sự cố kết nối. Bạn có thể thử lại sau nhé?";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setIsTyping(true);

        const aiResponse = await callGemini(userMsg);
        const actionResult = handleAction(aiResponse);
        
        // Clean tags from visible text
        const cleanText = aiResponse.replace(/\[.*?\]/g, '').trim();

        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: cleanText || actionResult?.message || "Tôi đã thực hiện yêu cầu của bạn.", 
            action: actionResult?.action, 
            actionText: actionResult?.actionText 
        }]);
        setIsTyping(false);
    };

    return (
        <div className="ai-assistant-wrapper no-print" style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 99999 }}>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        onClick={() => setIsOpen(true)}
                        className="btn-ai-bubble"
                    >
                        <Sparkles size={28} />
                        <span className="pulse-ring"></span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={`ai-chat-window ${isMinimized ? 'minimized' : ''}`}
                    >
                        {/* Header */}
                        <div className="ai-chat-header">
                            <div className="d-flex align-items-center gap-3">
                                <div className="ai-avatar">
                                    <Bot size={20} />
                                </div>
                                <div>
                                    <h6 className="m-0 fw-bold ls-1 text-white">LUXAI ASSISTANT</h6>
                                    <div className="d-flex align-items-center gap-1">
                                        <span className="online-dot"></span>
                                        <span className="text-white-50" style={{ fontSize: '0.6rem' }}>Powered by Gemini 1.5</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="btn-ai-icon">
                                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="btn-ai-icon">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="ai-chat-body scrollbar-hide" ref={scrollRef}>
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`msg-row ${msg.role}`}>
                                            <div className="msg-content shadow-sm">
                                                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                                {msg.action && (
                                                    <button onClick={msg.action} className="btn-msg-action mt-2">
                                                        {msg.actionText} <ArrowRight size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isTyping && (
                                        <div className="msg-row assistant">
                                            <div className="typing-indicator">
                                                <span></span><span></span><span></span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Actions */}
                                <div className="ai-quick-actions">
                                    <button onClick={() => setInput('Tìm sản phẩm Ghế Armchair')} className="qa-chip">
                                        <Eye size={12} /> Xem Ghế
                                    </button>
                                    <button onClick={() => setInput('Thêm bàn trà vào giỏ hàng')} className="qa-chip">
                                        <ShoppingBag size={12} /> Thêm Bàn Trà
                                    </button>
                                </div>

                                {/* Input */}
                                <form onSubmit={handleSubmit} className="ai-chat-footer">
                                    <input 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Hỏi trợ lý LuxAI..." 
                                        className="ai-chat-input"
                                    />
                                    <button type="submit" className="btn-ai-send">
                                        <Send size={18} />
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .btn-ai-bubble {
                    width: 70px; height: 70px; background: #111; color: white; border: none;
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3); cursor: pointer; position: relative;
                    transition: all 0.3s;
                }
                .btn-ai-bubble:hover { transform: scale(1.1); background: #c5a059; }
                .pulse-ring {
                    position: absolute; inset: -5px; border: 2px solid #c5a059; border-radius: 50%;
                    animation: ai-pulse 2s infinite; pointer-events: none;
                }
                @keyframes ai-pulse {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                .ai-chat-window {
                    width: 400px; height: 600px; background: white; border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.15); display: flex; flex-direction: column;
                    overflow: hidden; border: 1px solid #eee;
                }
                .ai-chat-window.minimized { height: 80px; width: 300px; }
                .ai-chat-header {
                    background: #111; padding: 20px; display: flex; justify-content: space-between; align-items: center;
                }
                .ai-avatar {
                    width: 40px; height: 40px; background: #c5a059; color: white; border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                }
                .online-dot { width: 8px; height: 8px; background: #28a745; border-radius: 50%; }
                .btn-ai-icon { background: none; border: none; color: white; opacity: 0.5; transition: 0.3s; }
                .btn-ai-icon:hover { opacity: 1; }
                .ai-chat-body { flex: 1; padding: 25px; overflow-y: auto; background: #fcfcfc; }
                .msg-row { display: flex; margin-bottom: 20px; }
                .msg-row.user { justify-content: flex-end; }
                .msg-content {
                    max-width: 80%; padding: 15px 20px; border-radius: 15px; font-size: 0.9rem; line-height: 1.5;
                }
                .assistant .msg-content { background: white; border: 1px solid #eee; color: #333; border-bottom-left-radius: 2px; }
                .user .msg-content { background: #111; color: white; border-bottom-right-radius: 2px; }
                .btn-msg-action {
                    background: #f8f8f8; border: 1px solid #eee; padding: 8px 15px; border-radius: 8px;
                    font-size: 0.75rem; font-weight: 700; color: #111; display: flex; align-items: center; gap: 8px;
                    transition: 0.3s;
                }
                .btn-msg-action:hover { background: #111; color: white; }
                .ai-quick-actions { padding: 10px 20px; display: flex; gap: 10px; overflow-x: auto; background: #fcfcfc; border-top: 1px solid #f5f5f5; }
                .qa-chip {
                    white-space: nowrap; background: white; border: 1px solid #eee; padding: 6px 12px; border-radius: 20px;
                    font-size: 0.7rem; font-weight: 600; color: #666; cursor: pointer; transition: 0.2s;
                    display: flex; align-items: center; gap: 5px;
                }
                .qa-chip:hover { border-color: #111; color: #111; }
                .ai-chat-footer { padding: 20px; background: white; border-top: 1px solid #eee; display: flex; gap: 15px; }
                .ai-chat-input {
                    flex: 1; border: none; background: #f5f5f5; padding: 12px 20px; border-radius: 12px;
                    font-size: 0.9rem; outline: none; transition: 0.3s;
                }
                .ai-chat-input:focus { background: #eee; }
                .btn-ai-send {
                    width: 45px; height: 45px; background: #111; color: white; border: none; border-radius: 12px;
                    display: flex; align-items: center; justify-content: center; transition: 0.3s;
                }
                .btn-ai-send:hover { background: #c5a059; transform: translateY(-2px); }
                .typing-indicator { display: flex; gap: 4px; padding: 10px 0; }
                .typing-indicator span {
                    width: 6px; height: 6px; background: #ccc; border-radius: 50%;
                    animation: ai-typing 1s infinite ease-in-out;
                }
                .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
                .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes ai-typing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            `}</style>
        </div>
    );
};

export default AIAssistant;
