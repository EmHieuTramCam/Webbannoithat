import React from 'react';

const CartDrawer = ({ isOpen, onClose, cart, total, onRemove, onUpdateQty, onCheckout }) => (
    <div className={`cart-drawer-master ${isOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="brand-font">Giỏ Hàng</h2>
            <button onClick={onClose} className="btn-close-clean"><i className="fas fa-times"></i></button>
        </div>
        <div className="cart-items-box">
            {cart.length === 0 ? (
                <div className="text-center py-5">
                    <i className="fas fa-shopping-bag text-muted mb-3" style={{ fontSize: '3rem', opacity: 0.2 }}></i>
                    <p className="text-muted ls-1">Giỏ hàng của bạn đang trống</p>
                </div>
            ) : (
                cart.map(i => (
                    <div key={i.id} className="d-flex gap-4 mb-4 pb-4 border-bottom align-items-center">
                        <img src={i.image} style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt={i.name} />
                        <div className="flex-grow-1">
                            <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{i.name}</h6>
                            <p className="text-gold small mb-2" style={{ fontWeight: 600 }}>{new Intl.NumberFormat('vi-VN').format(i.price)}đ</p>
                            <div className="d-flex align-items-center gap-3 mt-2">
                                <div className="d-flex align-items-center border" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onUpdateQty(i.id, -1); }} 
                                        className="btn btn-sm btn-light border-end" 
                                        style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: 0, zIndex: 5, position: 'relative' }}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <span className="px-3 small fw-bold" style={{ minWidth: '35px', textAlign: 'center' }}>{i.qty}</span>
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onUpdateQty(i.id, 1); }} 
                                        className="btn btn-sm btn-light border-start" 
                                        style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: 0, zIndex: 5, position: 'relative' }}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <button 
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(i.id); }} 
                                    className="btn btn-link text-danger p-0 text-decoration-none small ms-2" 
                                    style={{ fontSize: '0.8rem', zIndex: 5, position: 'relative' }}
                                >
                                    <i className="far fa-trash-alt me-1"></i> Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
        {cart.length > 0 && (
            <div className="mt-auto pt-5">
                <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted ls-1 uppercase small fw-bold">Tổng cộng:</span>
                    <span className="h4 m-0 fw-bold">{new Intl.NumberFormat('vi-VN').format(total)}đ</span>
                </div>
                <button className="btn-lux-black w-100 py-4 d-flex align-items-center justify-content-center gap-2" onClick={onCheckout}>
                    TIẾN HÀNH THANH TOÁN <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        )}
    </div>
);

export default CartDrawer;
