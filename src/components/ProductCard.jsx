import React from 'react';

export const ProductCard = ({ p, onOpen, onAdd }) => (
    <div className="product-card-master h-100 d-flex flex-column">
        <div className="pc-img-box" onClick={onOpen}>
            <img 
                src={p.image} 
                alt={p.name} 
                loading="lazy" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            {p.tag && <span className="pc-badge">{p.tag}</span>}
            <div className="pc-overlay">
                <div className="quick-view-badge">
                    <i className="fas fa-eye me-2"></i> XEM CHI TIẾT
                </div>
            </div>
        </div>
        <div className="pc-body d-flex flex-column" style={{ flex: 1 }}>
            <p className="text-gold small ls-3 mb-2 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>{p.category}</p>
            <h5 className="brand-font mb-3" onClick={onOpen} style={{ fontSize: '1.4rem', cursor: 'pointer' }}>{p.name}</h5>
            <div className="fw-bold mb-4" style={{ fontSize: '1.1rem' }}>{new Intl.NumberFormat('vi-VN').format(p.price)}đ</div>
            <div className="mt-auto">
                <button onClick={() => onAdd(p)} className="btn-lux-outline-black w-100 py-2">THÊM VÀO GIỎ</button>
            </div>
        </div>
    </div>
);
