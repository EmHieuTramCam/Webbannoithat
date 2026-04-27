import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductDetail = ({ p, onClose, onAdd }) => {
    const [qty, setQty] = useState(1);
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="detail-overlay-master" style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
            <motion.div initial={{ scale: 0.98, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0, y: 30 }} transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }} className="detail-modal-master" style={{ maxWidth: '1150px', borderRadius: '4px', overflow: 'hidden' }}>
                <button className="close-btn-master" onClick={onClose} style={{ top: '30px', right: '30px', zIndex: 100 }}><i className="fas fa-times"></i></button>
                <div className="row g-0 h-100">
                    <div className="col-lg-6 h-100 d-none d-lg-block position-relative">
                        <img src={p.image} className="img-full-cover" alt="" style={{ transition: 'transform 10s linear' }} />
                        <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#fff', zIndex: 2 }}>
                            <span className="small ls-4 uppercase fw-bold" style={{ fontSize: '0.65rem', opacity: 0.8 }}>Collection 2026</span>
                            <h4 className="brand-font m-0" style={{ fontSize: '1.5rem' }}>LuxModern Heritage</h4>
                        </div>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 40%)', zIndex: 1 }}></div>
                    </div>
                    <div className="col-lg-6 position-relative bg-white h-100">
                        <div className="detail-info-scroll">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                <p className="text-gold ls-4 mb-2 uppercase fw-bold" style={{ fontSize: '0.75rem' }}>{p.category}</p>
                                <h2 className="brand-font mb-4" style={{ fontSize: '3.6rem', lineHeight: '1', color: '#111', letterSpacing: '-1px' }}>{p.name}</h2>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <h3 className="m-0" style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111' }}>{new Intl.NumberFormat('vi-VN').format(p.price)}đ</h3>
                                    <span className="text-muted text-decoration-line-through small">{new Intl.NumberFormat('vi-VN').format(p.price * 1.2)}đ</span>
                                </div>
                            </motion.div>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-muted mb-5" style={{ fontSize: '0.95rem', lineHeight: '1.9', borderLeft: '2px solid #f0f0f0', paddingLeft: '20px' }}>
                                {p.desc || "Sản phẩm được chế tác tỉ mỉ từ những vật liệu cao cấp nhất, mang lại vẻ đẹp vượt thời gian và sự sang trọng tuyệt đối cho không gian của bạn."}
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="row mb-5">
                                <div className="col-6">
                                    <span className="d-block fw-bold small ls-2 uppercase mb-1" style={{ fontSize: '0.65rem', color: '#888' }}>
                                        <i className="fas fa-layer-group me-1"></i> Vật liệu
                                    </span>
                                    <span className="text-dark small fw-bold">{p.material || "Gỗ sồi, Đồng thau"}</span>
                                </div>
                                <div className="col-6">
                                    <span className="d-block fw-bold small ls-2 uppercase mb-1" style={{ fontSize: '0.65rem', color: '#888' }}>
                                        <i className="fas fa-shield-alt me-1"></i> Bảo hành
                                    </span>
                                    <span className="text-dark small fw-bold">24 tháng tận nơi</span>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="d-flex gap-3 mb-5">
                                <div className="d-flex align-items-center border" style={{ padding: '0 15px' }}>
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="btn btn-link text-dark p-2"><i className="fas fa-minus small"></i></button>
                                    <span className="px-3 fw-bold" style={{ minWidth: '40px', textAlign: 'center' }}>{qty}</span>
                                    <button onClick={() => setQty(qty + 1)} className="btn btn-link text-dark p-2"><i className="fas fa-plus small"></i></button>
                                </div>
                                <button onClick={() => {onAdd(p, qty); onClose();}} className="btn-lux-black flex-grow-1 py-3 ls-2 fw-bold" style={{ backgroundColor: '#111', color: '#fff' }}>
                                    <i className="fas fa-shopping-cart me-2 small"></i> THÊM VÀO GIỎ HÀNG
                                </button>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="d-flex justify-content-between pt-4 border-top">
                                <div className="text-center">
                                    <i className="fas fa-truck text-muted mb-2"></i>
                                    <p className="m-0 uppercase ls-1 fw-bold" style={{ fontSize: '0.6rem' }}>Free Delivery</p>
                                </div>
                                <div className="text-center">
                                    <i className="fas fa-certificate text-muted mb-2"></i>
                                    <p className="m-0 uppercase ls-1 fw-bold" style={{ fontSize: '0.6rem' }}>Authentic Only</p>
                                </div>
                                <div className="text-center">
                                    <i className="fas fa-undo text-muted mb-2"></i>
                                    <p className="m-0 uppercase ls-1 fw-bold" style={{ fontSize: '0.6rem' }}>30 Days Return</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetail;
