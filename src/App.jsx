import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_PRODUCTS = [
  { id: 1, name: "Ghế Armchair Ethereal", price: 12500000, category: "Ghế", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80", tag: "Mới", material: "Da Ý", size: "85x90cm", desc: "Được chế tác từ da bò Ý nguyên tấm và khung gỗ mun quý hiếm, Ghế Armchair Ethereal mang lại sự tĩnh lặng và đẳng cấp cho không gian đọc sách." },
  { id: 2, name: "Bàn Obsidian Black", price: 24500000, category: "Bàn", image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80", tag: "Limited", material: "Đá Obsidian", size: "220x100cm", desc: "Mặt bàn bằng đá Obsidian đen tuyền bóng bẩy, chân kim loại mạ vàng 24K, một biểu tượng của sự quyền lực." },
  { id: 3, name: "Đèn Celestial Gold", price: 5200000, category: "Đèn", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80", material: "Đồng", size: "40x60cm", desc: "Ánh sáng tỏa ra từ Celestial không chỉ là ánh sáng, đó là một tác phẩm nghệ thuật lan tỏa sự ấm áp." },
  { id: 4, name: "Sofa Imperial Velvet", price: 65000000, category: "Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", tag: "Hot", material: "Nhung", size: "280x110cm", desc: "Sự êm ái tuyệt đối từ lớp đệm nhung cao cấp kết hợp cùng thiết kế công thái học đỉnh cao." },
  { id: 5, name: "Giường Monarch Oak", price: 38000000, category: "Giường", image: "https://sofatuanphat.com/wp-content/uploads/2025/04/O1CN01Yu1I1a2M5vNjQ8ftA_2215694269777.jpg_q50.jpg_.webp", material: "Gỗ Sồi", size: "200x220cm", desc: "Giấc ngủ là nền tảng của thành công. Monarch Oak mang đến sự vững chãi và sang trọng bậc nhất." },
  { id: 6, name: "Kệ Grand Ebony", price: 15800000, category: "Kệ", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800&q=80", material: "Gỗ Mun", size: "120x180cm", desc: "Lưu giữ những bộ sưu tập quý giá của bạn trên nền gỗ mun đen huyền bí." }
];

const CATEGORIES = ["Tất cả", "Ghế", "Bàn", "Đèn", "Sofa", "Giường", "Kệ"];

const AdminDashboard = ({ onLogout, products, onAdd, onEdit, onDelete }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleOpenForm = (p = null) => {
        setEditingProduct(p);
        setIsFormOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const f = new FormData(e.target);
        const p = {
            id: editingProduct ? editingProduct.id : Date.now(),
            name: f.get('name'),
            price: Number(f.get('price')),
            category: f.get('category'),
            image: f.get('image'),
            desc: f.get('desc'),
            tag: f.get('tag')
        };
        if (editingProduct) onEdit(p);
        else onAdd(p);
        setIsFormOpen(false);
    };

    return (
        <div className="admin-master d-flex" style={{ minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
            <aside className="admin-sidebar bg-dark text-white p-4" style={{ width: '280px' }}>
                <div className="brand-lux-main mb-5 d-flex align-items-center gap-2">
                    <div style={{ backgroundColor: '#c5a059', color: '#111', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>A</div>
                    <span className="small ls-3 fw-bold text-white">LUX ADMIN</span>
                </div>
                <nav className="d-flex flex-column gap-3">
                    <button className="btn btn-link text-white text-decoration-none text-start p-2 bg-secondary bg-opacity-25 rounded-0 small ls-1"><i className="fas fa-chart-line me-3"></i> TỔNG QUAN</button>
                    <button className="btn btn-link text-white-50 text-decoration-none text-start p-2 hover-white small ls-1"><i className="fas fa-box me-3"></i> SẢN PHẨM</button>
                    <button className="btn btn-link text-white-50 text-decoration-none text-start p-2 hover-white small ls-1"><i className="fas fa-shopping-cart me-3"></i> ĐƠN HÀNG</button>
                    <button className="btn btn-link text-white-50 text-decoration-none text-start p-2 hover-white small ls-1"><i className="fas fa-users me-3"></i> KHÁCH HÀNG</button>
                    <button className="btn btn-link text-white-50 text-decoration-none text-start p-2 hover-white small ls-1 mt-5 pt-5" onClick={onLogout}><i className="fas fa-sign-out-alt me-3"></i> ĐĂNG XUẤT</button>
                </nav>
            </aside>

            <main className="flex-grow-1 p-5">
                <header className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="brand-font m-0">Tổng Quan Hệ Thống</h2>
                    <div className="d-flex gap-3">
                        <button onClick={() => handleOpenForm()} className="btn btn-dark rounded-0 px-4 small ls-1"><i className="fas fa-plus me-2"></i> THÊM SẢN PHẨM MỚI</button>
                    </div>
                </header>

                <div className="row g-4 mb-5">
                    <div className="col-md-3">
                        <div className="bg-white p-4 shadow-sm border-start border-4 border-gold">
                            <p className="text-muted small ls-1 uppercase fw-bold mb-2">Doanh Thu Tháng</p>
                            <h3 className="m-0 fw-bold">1.280M đ</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 shadow-sm border-start border-4 border-dark">
                            <p className="text-muted small ls-1 uppercase fw-bold mb-2">Đơn Hàng Mới</p>
                            <h3 className="m-0 fw-bold">142</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 shadow-sm border-start border-4 border-dark">
                            <p className="text-muted small ls-1 uppercase fw-bold mb-2">Khách Hàng</p>
                            <h3 className="m-0 fw-bold">850</h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="bg-white p-4 shadow-sm border-start border-4 border-success">
                            <p className="text-muted small ls-1 uppercase fw-bold mb-2">Lượt Truy Cập</p>
                            <h3 className="m-0 fw-bold">12.5k</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 shadow-sm">
                    <h5 className="mb-4 fw-bold small ls-2 uppercase">Danh Sách Sản Phẩm Vừa Cập Nhật</h5>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Sản Phẩm</th>
                                    <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Phân Loại</th>
                                    <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Giá Bán</th>
                                    <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-3">
                                                <img src={p.image} style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="" />
                                                <span className="fw-bold small">{p.name}</span>
                                            </div>
                                        </td>
                                        <td className="small">{p.category}</td>
                                        <td className="fw-bold small">{new Intl.NumberFormat('vi-VN').format(p.price)}đ</td>
                                        <td className="text-end">
                                            <button onClick={() => handleOpenForm(p)} className="btn btn-sm btn-outline-dark rounded-0 me-2"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => onDelete(p.id)} className="btn btn-sm btn-outline-danger rounded-0"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* FORM MODAL */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="detail-overlay-master d-flex align-items-center justify-content-center" style={{ zIndex: 6000 }}>
                        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-white p-5 shadow-lg" style={{ width: '100%', maxWidth: '600px' }}>
                            <h3 className="brand-font mb-4">{editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
                            <form onSubmit={handleSave} className="row g-3">
                                <div className="col-12"><label className="small fw-bold">Tên sản phẩm</label><input name="name" defaultValue={editingProduct?.name} className="form-control rounded-0" required /></div>
                                <div className="col-md-6"><label className="small fw-bold">Giá bán (đ)</label><input name="price" type="number" defaultValue={editingProduct?.price} className="form-control rounded-0" required /></div>
                                <div className="col-md-6"><label className="small fw-bold">Danh mục</label>
                                    <select name="category" defaultValue={editingProduct?.category || 'Ghế'} className="form-select rounded-0">
                                        {CATEGORIES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="col-12"><label className="small fw-bold">URL Hình ảnh</label><input name="image" defaultValue={editingProduct?.image} className="form-control rounded-0" required /></div>
                                <div className="col-12"><label className="small fw-bold">Mô tả ngắn</label><textarea name="desc" defaultValue={editingProduct?.desc} className="form-control rounded-0" rows="3"></textarea></div>
                                <div className="col-12"><label className="small fw-bold">Tag (Mới, Hot, Limited...)</label><input name="tag" defaultValue={editingProduct?.tag} className="form-control rounded-0" /></div>
                                <div className="col-12 d-flex gap-3 mt-4">
                                    <button type="submit" className="btn btn-dark rounded-0 px-4">LƯU THÔNG TIN</button>
                                    <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-outline-secondary rounded-0 px-4">HỦY</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProductCardMaster = ({ p, onOpen, onAdd }) => (
    <div className="product-card-master h-100 d-flex flex-column">
        <div className="pc-img-box" onClick={onOpen}>
            <img src={p.image} alt={p.name} />
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

const DetailMaster = ({ p, onClose, onAdd }) => {
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

const CartDrawerMaster = ({ isOpen, onClose, cart, total, onRemove, onUpdateQty, onCheckout }) => (
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
                        <img src={i.image} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
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

const FooterMaster = () => (
    <footer className="bg-dark text-white pt-5 pb-4" style={{ backgroundColor: '#111', borderTop: '1px solid #333' }}>
        <div className="container pt-5">
            <div className="row g-5 mb-5 pb-5 border-bottom border-secondary" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                <div className="col-lg-4">
                    <h2 className="brand-font text-white mb-4" style={{ fontSize: '2.2rem', letterSpacing: '4px' }}>LUX<span style={{ fontWeight: 300 }}>MODERN</span></h2>
                    <p className="text-white-50 small mb-4" style={{ lineHeight: '2', maxWidth: '300px' }}>Biểu tượng của nội thất cao cấp dành cho tầng lớp thượng lưu. Sáng tạo từ tâm, kiến tạo không gian sống hoàn mỹ từ năm 1994.</p>
                    <div className="d-flex gap-4">
                        <a href="#" className="text-white social-icon-hover text-decoration-none"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-white social-icon-hover text-decoration-none"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-white social-icon-hover text-decoration-none"><i className="fab fa-pinterest-p"></i></a>
                        <a href="#" className="text-white social-icon-hover text-decoration-none"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div className="col-md-4 col-lg-2">
                    <h6 className="ls-3 mb-4 fw-bold" style={{ fontSize: '0.75rem', color: '#c5a059' }}>KHÁM PHÁ</h6>
                    <div className="d-flex flex-column gap-3 small">
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Bộ Sưu Tập Mới</a>
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Dự Án Tiêu Biểu</a>
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Về Chúng Tôi</a>
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Showroom Toàn Cầu</a>
                    </div>
                </div>
                <div className="col-md-4 col-lg-2">
                    <h6 className="ls-3 mb-4 fw-bold" style={{ fontSize: '0.75rem', color: '#c5a059' }}>HỖ TRỢ</h6>
                    <div className="d-flex flex-column gap-3 small">
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Dịch Vụ Thiết Kế</a>
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Bảo Hành 5 Năm</a>
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Vận Chuyển VIP</a>
                        <a href="#" className="text-decoration-none text-white-50 text-white-hover">Chính Sách Đổi Trả</a>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4">
                    <h6 className="ls-3 mb-4 fw-bold" style={{ fontSize: '0.75rem', color: '#c5a059' }}>LIÊN HỆ</h6>
                    <div className="text-white-50 small d-flex flex-column gap-3">
                        <p className="m-0 d-flex gap-3"><i className="fas fa-map-marker-alt text-white"></i> 123 Đại Lộ Thượng Lưu, TP. Hồ Chí Minh</p>
                        <p className="m-0 d-flex gap-3"><i className="fas fa-phone-alt text-white"></i> 1900 8888 (Hotline 24/7)</p>
                        <p className="m-0 d-flex gap-3"><i className="fas fa-envelope text-white"></i> concierge@luxmodern.com</p>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <p className="text-white-50 m-0" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>&copy; 2026 LUXMODERN DIGITAL ATELIER. ALL RIGHTS RESERVED.</p>
                <div className="d-flex gap-4">
                    <a href="#" className="text-decoration-none text-white-50 small" style={{ fontSize: '0.65rem' }}>ĐIỀU KHOẢN</a>
                    <a href="#" className="text-decoration-none text-white-50 small" style={{ fontSize: '0.65rem' }}>BẢO MẬT</a>
                </div>
            </div>
        </div>
    </footer>
);

const App = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('auth'); 
  const [authMode, setAuthMode] = useState('login'); 
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    const saved = localStorage.getItem('lux_user');
    if (saved) { 
        const u = JSON.parse(saved);
        setUser(u); 
        if (u.role === 'admin') setView('admin');
        else setView('store');
    }
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullName = formData.get('fullname');
    const username = formData.get('username');
    
    const displayName = authMode === 'signup' && fullName ? fullName : username;
    const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';
    const userData = { name: displayName, role: role };
    setUser(userData);
    localStorage.setItem('lux_user', JSON.stringify(userData));
    if (role === 'admin') setView('admin');
    else setView('store');
  };

  const addToCart = (p, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + qty } : item);
      return [...prev, { ...p, qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const filteredProducts = products.filter(p => 
    (activeCat === "Tất cả" || p.category === activeCat) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addProduct = (p) => setProducts([...products, p]);
  const updateProduct = (p) => setProducts(products.map(item => item.id === p.id ? p : item));
  const deleteProduct = (id) => setProducts(products.filter(item => item.id !== id));

  return (
    <div className="lux-master-app bg-white">
      <AnimatePresence mode="wait">
        
        
        {view === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="auth-full-screen">
            <div className="auth-split-box" style={{ height: '100vh', overflow: 'hidden' }}>
                <div className="auth-visual-side d-none d-lg-block col-lg-7 p-0 position-relative h-100 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img 
                            key={authMode}
                            initial={{ scale: 1.1, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 1.1, opacity: 0 }}
                            transition={{ duration: 1.5, ease: [0.165, 0.84, 0.44, 1] }}
                            src={authMode === 'login' 
                                ? "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600" 
                                : "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600"} 
                            alt="" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </AnimatePresence>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(17,17,17,0.4), transparent)' }}></div>
                    <div style={{ position: 'absolute', bottom: '60px', left: '60px', color: '#fff', maxWidth: '400px' }}>
                        <h1 className="brand-font display-3 mb-3">LuxModern</h1>
                        <p className="ls-2 small uppercase fw-bold" style={{ opacity: 0.8 }}>Kiến tạo không gian thượng lưu từ năm 1994.</p>
                    </div>
                </div>
                <div className="auth-form-side col-lg-5 h-100" style={{ overflowY: 'auto', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ margin: 'auto', width: '100%', maxWidth: '440px', padding: '50px 40px' }}>
                        <div className="auth-nav-pills-v3 mb-4">
                            <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>ĐĂNG NHẬP</button>
                            <button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>ĐĂNG KÝ</button>
                        </div>
                        
                        <div className="mb-4">
                            <h2 className="brand-font h2 mb-2" style={{ fontSize: '2.2rem' }}>{authMode === 'login' ? 'Chào mừng trở lại' : 'Trở thành Hội viên'}</h2>
                            <p className="text-muted small ls-1">{authMode === 'login' ? 'Vui lòng điền thông tin để tiếp tục.' : 'Bắt đầu hành trình kiến tạo không gian sống.'}</p>
                        </div>

                        <form onSubmit={handleAuth}>
                            {authMode === 'signup' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div className="mb-3">
                                        <label className="small ls-2 uppercase fw-bold text-muted mb-1 d-block" style={{ fontSize: '0.6rem' }}>Họ và Tên</label>
                                        <div className="position-relative">
                                            <i className="fas fa-user position-absolute text-muted" style={{ left: '0', top: '10px', fontSize: '0.8rem' }}></i>
                                            <input name="fullname" className="lux-input-modern ps-4" style={{ padding: '8px 0' }} type="text" placeholder="Nguyễn Văn A" required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="small ls-2 uppercase fw-bold text-muted mb-1 d-block" style={{ fontSize: '0.6rem' }}>Số điện thoại</label>
                                        <div className="position-relative">
                                            <i className="fas fa-phone position-absolute text-muted" style={{ left: '0', top: '10px', fontSize: '0.8rem' }}></i>
                                            <input className="lux-input-modern ps-4" style={{ padding: '8px 0' }} type="tel" placeholder="09xx xxx xxx" required />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            
                            <div className="mb-3">
                                <label className="small ls-2 uppercase fw-bold text-muted mb-1 d-block" style={{ fontSize: '0.6rem' }}>Tên đăng nhập / Email</label>
                                <div className="position-relative">
                                    <i className="fas fa-envelope position-absolute text-muted" style={{ left: '0', top: '10px', fontSize: '0.8rem' }}></i>
                                    <input name="username" className="lux-input-modern ps-4" style={{ padding: '8px 0' }} type="text" placeholder="user@example.com" required />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <label className="small ls-2 uppercase fw-bold text-muted m-0" style={{ fontSize: '0.6rem' }}>Mật khẩu</label>
                                    {authMode === 'login' && <a href="#" className="small text-gold text-decoration-none" style={{ fontSize: '0.6rem' }}>Quên mật khẩu?</a>}
                                </div>
                                <div className="position-relative">
                                    <i className="fas fa-lock position-absolute text-muted" style={{ left: '0', top: '10px', fontSize: '0.8rem' }}></i>
                                    <input className="lux-input-modern ps-4" style={{ padding: '8px 0' }} type="password" placeholder="••••••••" required />
                                </div>
                            </div>

                            <button className="btn-lux-black w-100 py-3 ls-2 uppercase mt-4" style={{ borderRadius: '0', fontSize: '0.8rem' }}>
                                {authMode === 'login' ? 'XÁC THỰC TRUY CẬP' : 'HOÀN TẤT ĐĂNG KÝ'}
                            </button>
                        </form>

                        <div className="mt-4 pt-3 border-top">
                            <p className="text-center text-muted small mb-3" style={{ fontSize: '0.7rem' }}>Hoặc tiếp tục với</p>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '0', fontSize: '0.75rem' }}>
                                    <i className="fab fa-google"></i> Google
                                </button>
                                <button className="btn btn-outline-dark w-100 py-2 d-flex align-items-center justify-content-center gap-2" style={{ borderRadius: '0', fontSize: '0.75rem' }}>
                                    <i className="fab fa-apple"></i> Apple
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <button onClick={() => setView('store')} className="btn btn-link text-muted small text-decoration-none ls-2" style={{ fontSize: '0.7rem' }}>
                                <i className="fas fa-arrow-left me-2"></i> QUAY LẠI CỬA HÀNG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        )}

        
        {view === 'store' && (
          <motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            
            <header className="main-header-lux sticky-top" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '1.2rem 0' }}>
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="header-left d-flex align-items-center gap-5">
                        <a href="#" className="brand-lux-main m-0 d-flex align-items-center gap-2 text-decoration-none lux-sway" onClick={() => setView('store')}>
                            <div style={{ backgroundColor: '#111', color: '#fff', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifycontent: 'center', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px' }}>L</div>
                            <span style={{ fontSize: '1.6rem', letterSpacing: '4px', fontWeight: 700, color: '#111' }}>UX<span style={{ fontWeight: 300 }}>MODERN</span></span>
                        </a>
                        <nav className="nav-links-lux d-none d-lg-flex gap-4 small" style={{ letterSpacing: '1.5px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#555', fontWeight: 500 }}>
                            <a href="#home" className="text-decoration-none text-dark">TRANG CHỦ</a>
                            <a href="#new-collection" className="text-decoration-none text-dark">BST MỚI</a>
                            <a href="#projects" className="text-decoration-none text-dark">DỰ ÁN</a>
                            <a href="#contact" className="text-decoration-none text-dark">LIÊN HỆ</a>
                        </nav>
                    </div>
                    <div className="header-right d-flex align-items-center gap-4">
                        <div className="search-minimal d-none d-md-flex align-items-center" style={{ borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>
                            <input placeholder="Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', width: '150px', fontWeight: 300, color: '#333' }} />
                            <i className="fas fa-search text-muted ms-2" style={{ fontSize: '0.85rem', cursor: 'pointer' }}></i>
                        </div>
                        <div className="cursor-pointer pos-rel mx-2" onClick={() => setIsCartOpen(true)}>
                            <i className="fas fa-shopping-bag" style={{ color: '#111', fontSize: '1.1rem' }}></i>
                            {cart.length > 0 && <span className="cart-badge-dot">{cart.length}</span>}
                        </div>
                        
                        {user ? (
                            <div className="d-flex align-items-center gap-2 user-profile-header">
                                <span className="small ls-1 d-none d-lg-block fw-bold" style={{ fontSize: '0.7rem', color: '#111' }}>CHÀO, {user.name.split(' ')[0].toUpperCase()}</span>
                                <div className="dropdown">
                                    <button className="btn btn-link text-dark p-0 dropdown-toggle no-caret" data-bs-toggle="dropdown">
                                        <i className="fas fa-user-circle" style={{ color: '#111', fontSize: '1.2rem' }}></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-3" style={{ borderRadius: '0', padding: '10px' }}>
                                        <li><div className="dropdown-item small ls-1 text-muted py-2" style={{ fontSize: '0.65rem' }}>{user.name} ({user.role})</div></li>
                                        {user.role === 'admin' && (
                                            <li><button onClick={() => setView('admin')} className="dropdown-item small ls-1 py-2 fw-bold text-dark"><i className="fas fa-cog me-2"></i> TRANG QUẢN TRỊ</button></li>
                                        )}
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button onClick={() => {localStorage.removeItem('lux_user'); setUser(null); setView('auth');}} className="dropdown-item small ls-1 py-2 text-danger" style={{ fontSize: '0.7rem', fontWeight: 700 }}>
                                                <i className="fas fa-sign-out-alt me-2"></i> ĐĂNG XUẤT
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => setView('auth')} className="btn btn-link text-dark p-0"><i className="fas fa-user-circle" style={{ color: '#111', fontSize: '1.2rem' }}></i></button>
                        )}
                    </div>
                </div>
            </header>

            
            <section className="hero-slider-main" style={{ minHeight: '88vh', backgroundColor: '#faf9f6', display: 'flex', alignItems: 'center', paddingTop: '3rem', paddingBottom: '3rem', overflow: 'hidden' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 z-index-10 relative pr-lg-5">
                            <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }} className="brand-font mb-4" style={{ color: '#1a1a1a', lineHeight: '1.1', fontSize: 'clamp(4rem, 7vw, 6rem)', fontWeight: 400, letterSpacing: '-2px' }}>
                                <span style={{ fontStyle: 'italic', paddingRight: '10px', color: '#c5a059' }}>Sống</span><br/>Đẳng Cấp
                            </motion.h1>
                            <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 1, ease: "easeOut" }} className="text-muted ls-1 mb-5" style={{ maxWidth: '400px', lineHeight: '2', fontSize: '0.95rem', fontWeight: 300 }}>
                                Kiến tạo không gian của những nhà lãnh đạo. Khám phá những kiệt tác nội thất được chế tác tinh xảo, mang vẻ đẹp vượt thời gian.
                            </motion.p>
                            <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="btn-lux-black px-5 py-3 ls-2 uppercase" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', backgroundColor: '#1a1a1a' }}>
                                KHÁM PHÁ NGAY
                            </motion.button>
                        </div>
                        <div className="col-lg-6 offset-lg-1 d-none d-lg-block">
                            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: [0.165, 0.84, 0.44, 1] }} style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '20px', bottom: '-20px', left: '20px', right: '-20px', backgroundColor: '#e9e6df', borderRadius: '2px', zIndex: 0 }}></div>
                                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" alt="Luxury Interior" className="lux-float" style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 1, borderRadius: '2px', boxShadow: '0 25px 50px rgba(0,0,0,0.06)' }} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="brand-heritage-lux py-5 my-5">
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-5"><img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200" alt="" className="img-fluid heritage-img" style={{ borderLeft: 'none' }} /></div>
                        <div className="col-lg-6 offset-lg-1">
                            <p className="text-gold ls-4 small uppercase mb-4 fw-bold">Di Sản LuxModern</p>
                            <h2 className="brand-font display-4 mb-4 text-dark" style={{ lineHeight: '1.2' }}>Tinh Hoa Thiết Kế <br/>Từ Thập Kỷ Trước</h2>
                            <p className="text-muted lh-lg mb-5" style={{ fontSize: '0.95rem' }}>Mỗi sản phẩm tại LuxModern không chỉ là nội thất, mà là một câu chuyện về sự kiên trì, tỉ mỉ và khao khát vươn tới sự hoàn mỹ. Chúng tôi kết hợp kỹ thuật thủ công truyền thống với tư duy thiết kế đương đại.</p>
                            <div className="d-flex gap-5">
                                <div><h3 className="brand-font text-dark mb-2" style={{ fontSize: '2.5rem' }}>25+</h3><p className="small ls-1 uppercase text-muted">Năm Kinh Nghiệm</p></div>
                                <div><h3 className="brand-font text-dark mb-2" style={{ fontSize: '2.5rem' }}>5000+</h3><p className="small ls-1 uppercase text-muted">Dự Án VIP</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section id="new-collection" className="py-5 bg-white">
                <div className="container py-5">
                    <div className="d-flex justify-content-between align-items-end mb-5">
                        <div>
                            <span className="text-gold ls-3 uppercase small fw-bold mb-2 d-block">Mùa Thu - Đông 2026</span>
                            <h2 className="brand-font display-4" style={{ letterSpacing: '-1px' }}>Bộ Sưu Tập Di Sản</h2>
                        </div>
                        <a href="#" className="text-dark text-decoration-none fw-bold ls-2 small">XEM TẤT CẢ <i className="fas fa-arrow-right ms-2"></i></a>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="collection-featured-card position-relative overflow-hidden" style={{ height: '500px' }}>
                                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200" className="img-full-cover" alt="" />
                                <div className="position-absolute bottom-0 start-0 p-5 text-white w-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                                    <h3 className="brand-font h1 mb-2">The Emerald Suite</h3>
                                    <p className="small ls-1 opacity-75">Sự kết hợp giữa nhung xanh lục bảo và đá cẩm thạch trắng.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-flex flex-column gap-4">
                            <div className="collection-item-card position-relative flex-grow-1 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800" className="img-full-cover" alt="" />
                                <div className="position-absolute inset-0 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-all" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)' }}>
                                    <button className="btn btn-light btn-sm rounded-0 ls-2 py-2 px-3">CHI TIẾT</button>
                                </div>
                            </div>
                            <div className="collection-item-card position-relative flex-grow-1 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=800" className="img-full-cover" alt="" />
                                <div className="position-absolute inset-0 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-all" style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)' }}>
                                    <button className="btn btn-light btn-sm rounded-0 ls-2 py-2 px-3">CHI TIẾT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <div className="container py-5 mt-5">
                <div className="row g-5">
                    
                    
                    <aside className="col-lg-3">
                        <div className="sidebar-section mb-5"><h5 className="sidebar-title-master ls-2 mb-4">DANH MỤC</h5>
                            <ul className="cat-list-master">{CATEGORIES.map(c => (<li key={c} className={activeCat === c ? "active" : ""} onClick={() => setActiveCat(c)}>{c} Nội Thất</li>))}</ul>
                        </div>
                        <div className="sidebar-promo-banner mb-5"><img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800" alt="" /><div className="promo-txt"><h4>GIẢM 20%</h4><p>BST Summer Office</p></div></div>
                    </aside>

                    
                    <div className="col-lg-9">
                        <div className="grid-header d-flex justify-content-between align-items-center mb-5"><h3 className="brand-font">Sản Phẩm Cao Cấp</h3></div>
                        <div className="row g-4">
                            {filteredProducts.map((p, i) => (
                                <div key={p.id} className="col-md-6 col-xl-4"><ProductCardMaster p={p} onOpen={() => setSelectedProduct(p)} onAdd={addToCart} /></div>
                            ))}
                        </div>
                        
                        
                        <div className="wide-promo-banner mt-5"><img src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1600" alt="" /><div className="banner-txt"><h2 className="brand-font">Thiết Kế Độc Bản</h2><p>Chỉ dành cho hội viên LuxVip</p></div></div>
                    </div>

                </div>
            </div>

            
            <section id="projects" className="py-5" style={{ backgroundColor: '#111', color: '#fff' }}>
                <div className="container py-5">
                    <div className="text-center mb-5 pb-3">
                        <span className="text-gold ls-4 uppercase small fw-bold mb-3 d-block">Kiến Tạo Không Gian</span>
                        <h2 className="brand-font display-3 mb-4">Dự Án Tiêu Biểu</h2>
                        <p className="text-white-50 mx-auto" style={{ maxWidth: '700px' }}>Những không gian sống độc bản được chúng tôi thiết kế và thi công trọn gói cho những gia chủ tinh hoa nhất.</p>
                    </div>
                    <div className="row g-0 border border-secondary">
                        <div className="col-md-6 border-end border-secondary">
                            <div className="project-card p-5 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="brand-font h2 mb-4">Penthouse Landmark 81</h4>
                                    <p className="text-white-50 small ls-1 mb-5">Phong cách hiện đại kết hợp các vật liệu quý hiếm, mang lại tầm nhìn vô cực giữa lòng Sài Gòn.</p>
                                </div>
                                <div className="project-img-box overflow-hidden" style={{ height: '300px' }}>
                                    <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800" className="img-full-cover hover-scale" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="project-card p-5 h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="brand-font h2 mb-4">The Golden Villa - Ciputra</h4>
                                    <p className="text-white-50 small ls-1 mb-5">Vẻ đẹp tân cổ điển sang trọng, điểm xuyết các chi tiết dát vàng thủ công tinh xảo.</p>
                                </div>
                                <div className="project-img-box overflow-hidden" style={{ height: '300px' }}>
                                    <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800" className="img-full-cover hover-scale" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="newsletter-lux-v2 py-5" style={{ backgroundColor: '#fcfcfc', borderTop: '1px solid #eee' }}>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <span className="text-gold ls-3 small uppercase fw-bold mb-3 d-block">Kết nối với chúng tôi</span>
                            <h2 className="brand-font display-5 mb-4" style={{ letterSpacing: '-1px' }}>Nhận Bản Tin Đặc Quyền</h2>
                            <p className="text-muted mb-5 mx-auto ls-1" style={{ maxWidth: '600px' }}>Đăng ký để nhận những thông tin mới nhất về bộ sưu tập, dự án độc quyền và ưu đãi dành riêng cho hội viên LuxModern.</p>
                            <div className="newsletter-form-premium mx-auto" style={{ maxWidth: '500px', display: 'flex', borderBottom: '2px solid #111', paddingBottom: '10px' }}>
                                <input type="email" placeholder="Địa chỉ email của bạn..." style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', padding: '10px 0', fontSize: '1rem', fontWeight: 300 }} />
                                <button className="btn btn-link text-dark p-0 text-decoration-none fw-bold ls-2" style={{ whiteSpace: 'nowrap', fontSize: '0.8rem' }}>THAM GIA NGAY</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <FooterMaster />

          </motion.div>
        )}

        
        <AnimatePresence>
            {selectedProduct && <DetailMaster p={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}
        </AnimatePresence>

        
        {view === 'checkout' && (
            <div className="checkout-view py-5" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
                <div className="container py-5">
                    <div className="d-flex align-items-center mb-5 pb-3 border-bottom">
                        <button onClick={() => setView('store')} className="btn btn-link text-dark p-0 text-decoration-none me-4"><i className="fas fa-arrow-left me-2"></i> Quay lại</button>
                        <h2 className="brand-font m-0" style={{ fontSize: '2.5rem' }}>Thanh Toán</h2>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <h4 className="mb-4 fw-bold" style={{ fontSize: '1.2rem' }}>Thông tin giao hàng</h4>
                            <form className="row g-4 mb-5">
                                <div className="col-md-6">
                                    <label className="small fw-bold text-muted mb-2 uppercase" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        <i className="fas fa-user me-2 text-gold"></i> Họ và Tên
                                    </label>
                                    <input className="lux-input-clean" placeholder="Nhập họ tên đầy đủ" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="small fw-bold text-muted mb-2 uppercase" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        <i className="fas fa-phone me-2 text-gold"></i> Số điện thoại
                                    </label>
                                    <input className="lux-input-clean" placeholder="09xx xxx xxx" required />
                                </div>
                                <div className="col-12">
                                    <label className="small fw-bold text-muted mb-2 uppercase" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        <i className="fas fa-envelope me-2 text-gold"></i> Email
                                    </label>
                                    <input className="lux-input-clean" type="email" placeholder="email@example.com" required />
                                </div>
                                <div className="col-12">
                                    <label className="small fw-bold text-muted mb-2 uppercase" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        <i className="fas fa-map-marker-alt me-2 text-gold"></i> Địa chỉ giao hàng
                                    </label>
                                    <input className="lux-input-clean" placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố" required />
                                </div>
                                <div className="col-12">
                                    <label className="small fw-bold text-muted mb-2 uppercase" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        <i className="fas fa-comment-dots me-2 text-gold"></i> Ghi chú đơn hàng (Tùy chọn)
                                    </label>
                                    <input className="lux-input-clean" placeholder="Lưu ý khi giao hàng..." />
                                </div>
                            </form>

                            <h4 className="mb-4 fw-bold" style={{ fontSize: '1.2rem' }}>Phương thức thanh toán</h4>
                            <div className="d-flex flex-column gap-3">
                                <div className={`payment-method-box ${paymentMethod === 'cod' ? 'active' : ''}`} onClick={() => setPaymentMethod('cod')} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <div className="d-flex align-items-center gap-3 w-100">
                                        <i className={`far ${paymentMethod === 'cod' ? 'fa-dot-circle text-dark' : 'fa-circle text-muted'} fs-5`}></i>
                                        <div>
                                            <div className="fw-bold">Thanh toán khi nhận hàng (COD)</div>
                                            <div className="small text-muted mt-1">Khách hàng thanh toán bằng tiền mặt khi giao hàng.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`payment-method-box ${paymentMethod === 'transfer' ? 'active' : ''}`} onClick={() => setPaymentMethod('transfer')} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <div className="d-flex align-items-center gap-3 w-100">
                                        <i className={`far ${paymentMethod === 'transfer' ? 'fa-dot-circle text-dark' : 'fa-circle text-muted'} fs-5`}></i>
                                        <div>
                                            <div className="fw-bold">Chuyển khoản ngân hàng (VietQR)</div>
                                            <div className="small text-muted mt-1">Quét mã QR bằng ứng dụng ngân hàng để thanh toán tự động.</div>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {paymentMethod === 'transfer' && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-100 mt-3 pt-3 border-top overflow-hidden d-flex flex-column align-items-center">
                                                <div className="p-3 bg-white border rounded shadow-sm">
                                                    <img src={`https://img.vietqr.io/image/techcombank-2907056886-compact2.png?amount=${total}&addInfo=Thanh toan LuxModern&accountName=DO%20MINH%20HIEU`} alt="VietQR Code" style={{ width: '220px', display: 'block' }} />
                                                </div>
                                                <p className="small text-muted mt-3 text-center w-75" style={{ fontSize: '0.75rem' }}>Mở ứng dụng ngân hàng để quét mã VietQR. Hệ thống sẽ tự động xác nhận đơn hàng sau khi nhận được thanh toán.</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div style={{ backgroundColor: '#faf9f6', padding: '3rem 2.5rem', borderRadius: '2px', border: '1px solid #eaeaea' }}>
                                <h3 className="brand-font mb-4" style={{ fontSize: '1.8rem' }}>Đơn hàng của bạn</h3>
                                <div className="cart-items-preview mb-4 pb-4 border-bottom">
                                    {cart.map(item => (
                                        <div key={item.id} className="d-flex gap-3 mb-3">
                                            <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '2px' }} />
                                            <div className="flex-grow-1">
                                                <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{item.name}</h6>
                                                <div className="text-muted small">SL: {item.qty}</div>
                                            </div>
                                            <div className="fw-bold" style={{ fontSize: '0.9rem' }}>{new Intl.NumberFormat('vi-VN').format(item.price * item.qty)}đ</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="d-flex justify-content-between mb-3 text-muted">
                                    <span>Tạm tính</span>
                                    <span>{new Intl.NumberFormat('vi-VN').format(total)}đ</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4 pb-4 border-bottom text-muted">
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                
                                <div className="d-flex justify-content-between h4 mb-5" style={{ color: '#111', fontWeight: 700 }}>
                                    <span>Tổng cộng</span>
                                    <span>{new Intl.NumberFormat('vi-VN').format(total)}đ</span>
                                </div>
                                
                                <button className="btn-lux-black w-100 py-3 ls-1" style={{ fontSize: '0.9rem' }} onClick={() => {alert('Đặt hàng thành công! Cảm ơn bạn đã tin tưởng LuxModern.'); setView('store'); setCart([]);}}>
                                    XÁC NHẬN ĐẶT HÀNG
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        
        {view === 'admin' && (
            <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AdminDashboard 
                    products={products} 
                    onAdd={addProduct}
                    onEdit={updateProduct}
                    onDelete={deleteProduct}
                    onLogout={() => {localStorage.removeItem('lux_user'); setUser(null); setView('auth');}} 
                />
                <button 
                    onClick={() => setView('store')} 
                    className="btn btn-dark position-fixed bottom-0 end-0 m-4 rounded-pill px-4 shadow-lg"
                    style={{ zIndex: 1000, fontSize: '0.7rem', letterSpacing: '1px' }}
                >
                    <i className="fas fa-store me-2"></i> VỀ CỬA HÀNG
                </button>
            </motion.div>
        )}

      </AnimatePresence>
      <CartDrawerMaster 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart} 
          total={total} 
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onCheckout={() => {setIsCartOpen(false); setView('checkout');}} 
      />
    </div>
  );
};

export default App;
