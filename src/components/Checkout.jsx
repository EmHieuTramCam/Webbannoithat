import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = ({ cart, total, setView, clearCart, addOrder }) => {
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [payMethod, setPayMethod] = useState('cod'); // 'cod' or 'bank'
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        note: ''
    });
    const [finalOrder, setFinalOrder] = useState(null);

    // VietQR Configuration
    const bankId = "techcombank"; // Ngân hàng Quân Đội
    const accountNo = "2907056886"; // Số tài khoản mẫu
    const accountName = "DO MINH HIEU";
    const addInfo = `LUXMODERN_${Date.now().toString().slice(-6)}`;
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?amount=${total}&addInfo=${addInfo}&accountName=${accountName}`;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderId = `LX${Date.now().toString().slice(-6)}`;
        const newOrder = {
            id: orderId,
            customer: formData.name,
            phone: formData.phone,
            address: formData.address,
            note: formData.note,
            total: total,
            date: new Date().toLocaleDateString('vi-VN'),
            items: [...cart],
            status: 'Đang xử lý'
        };
        setFinalOrder(newOrder);
        addOrder(newOrder);
        setOrderSuccess(true);
        // We don't automatically redirect if they might want to print the invoice
        // Or we increase the timeout
        setTimeout(() => {
            clearCart();
            // setView('store'); // Let the user decide when to go back or wait longer
        }, 1000);
    };

    const handlePrint = () => {
        window.print();
    };

    if (orderSuccess && finalOrder) {
        return (
            <div className="container py-5 my-5 text-center">
                <div className="no-print">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-5">
                        <div className="success-icon-box mb-4">
                            <i className="fas fa-check"></i>
                        </div>
                        <h1 className="brand-font display-4 mb-3">Tuyệt Vời!</h1>
                        <p className="text-muted ls-1 uppercase fw-bold mb-5" style={{ fontSize: '0.8rem' }}>Đơn hàng của bạn đã được ghi nhận</p>
                        <div className="bg-light p-4 d-inline-block border mb-5" style={{ minWidth: '350px' }}>
                            <p className="small mb-2">Mã đơn hàng: <span className="fw-bold">#{finalOrder.id}</span></p>
                            <p className="small mb-3">Tổng thanh toán: <span className="fw-bold text-gold">{new Intl.NumberFormat('vi-VN').format(finalOrder.total)}đ</span></p>
                            <div className="d-flex gap-2 justify-content-center">
                                <button onClick={handlePrint} className="btn btn-dark btn-sm rounded-0 px-4 py-2 ls-1 fw-bold">
                                    <i className="fas fa-file-pdf me-2"></i> XUẤT HÓA ĐƠN
                                </button>
                                <button onClick={() => setView('store')} className="btn btn-outline-dark btn-sm rounded-0 px-4 py-2 ls-1 fw-bold">
                                    QUAY LẠI CỬA HÀNG
                                </button>
                            </div>
                        </div>
                        <p className="text-muted small">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong giây lát.</p>
                    </motion.div>
                </div>

                {/* REDESIGNED LUXURY INVOICE */}
                <div id="printable-invoice" className="d-none d-print-block" style={{ color: '#111', fontFamily: "'Inter', sans-serif" }}>
                    {/* Header Section */}
                    <div className="d-flex justify-content-between align-items-end mb-5 pb-5 border-bottom border-dark border-2">
                        <div style={{ flex: 1 }}>
                            <h1 className="brand-font mb-2" style={{ fontSize: '4.5rem', lineHeight: 1, letterSpacing: '5px', fontWeight: 800 }}>LUXLIFE</h1>
                            <div className="d-flex align-items-center gap-3">
                                <span style={{ width: '40px', height: '2px', background: '#c5a059' }}></span>
                                <p className="small text-muted uppercase ls-4 mb-0 fw-bold">Authentic Furniture & Living</p>
                            </div>
                        </div>
                        <div className="text-end" style={{ flex: 1 }}>
                            <h2 className="brand-font uppercase ls-2 mb-2" style={{ color: '#c5a059' }}>Invoice</h2>
                            <div className="d-flex flex-column gap-1 small fw-bold uppercase ls-1">
                                <span>No. {finalOrder.id}</span>
                                <span>Date: {finalOrder.date}</span>
                                <span className="text-muted" style={{ fontSize: '0.6rem' }}>Authorized Copy</span>
                            </div>
                        </div>
                    </div>

                    {/* Parties Section */}
                    <div className="row mb-5 g-0">
                        <div className="col-5">
                            <div className="pe-5" style={{ borderLeft: '4px solid #c5a059', paddingLeft: '20px' }}>
                                <p className="small text-muted uppercase ls-2 fw-bold mb-3">Client Information</p>
                                <h4 className="fw-bold mb-1">{finalOrder.customer}</h4>
                                <p className="mb-1">{finalOrder.phone}</p>
                                <p className="small text-muted mb-0">{finalOrder.address}</p>
                                {finalOrder.note && (
                                    <div className="mt-3 small italic opacity-75">
                                        Note: {finalOrder.note}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center">
                            <div style={{ width: '1px', height: '80%', background: '#eee' }}></div>
                        </div>
                        <div className="col-5">
                            <div className="ps-4">
                                <p className="small text-muted uppercase ls-2 fw-bold mb-3 text-end">Store Details</p>
                                <div className="text-end">
                                    <h5 className="fw-bold mb-1">LUXLIFE SHOWROOM</h5>
                                    <p className="small mb-1">123 Luxury Blvd, Thảo Điền, TP. Thủ Đức</p>
                                    <p className="small mb-1">T: +84 (0) 28 88xx xxxx</p>
                                    <p className="small mb-0">E: hello@luxlife-furniture.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-5">
                        <div className="row g-0 py-3 mb-2 border-bottom border-dark border-2 uppercase ls-2 small fw-bold text-muted">
                            <div className="col-6">Description</div>
                            <div className="col-2 text-center">Qty</div>
                            <div className="col-2 text-end">Price</div>
                            <div className="col-2 text-end">Amount</div>
                        </div>
                        
                        {finalOrder.items.map((item, idx) => (
                            <div key={idx} className="row g-0 py-4 border-bottom align-items-center">
                                <div className="col-6">
                                    <h6 className="fw-bold mb-1 ls-1">{item.name.toUpperCase()}</h6>
                                    <p className="small text-muted mb-0">Premium Collection - Authentic Series</p>
                                </div>
                                <div className="col-2 text-center fw-bold">{item.qty}</div>
                                <div className="col-2 text-end">{new Intl.NumberFormat('vi-VN').format(item.price)}đ</div>
                                <div className="col-2 text-end fw-bold">{new Intl.NumberFormat('vi-VN').format(item.price * item.qty)}đ</div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Section */}
                    <div className="row justify-content-end mb-5">
                        <div className="col-5">
                            <div className="d-flex justify-content-between py-2 small uppercase ls-1">
                                <span className="text-muted">Subtotal</span>
                                <span className="fw-bold">{new Intl.NumberFormat('vi-VN').format(finalOrder.total)}đ</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 small uppercase ls-1">
                                <span className="text-muted">Shipping</span>
                                <span className="text-success fw-bold">Complimentary</span>
                            </div>
                            <div className="d-flex justify-content-between py-4 mt-2 border-top border-dark align-items-center">
                                <span className="h5 mb-0 fw-bold uppercase ls-2">Total Amount</span>
                                <span className="h3 mb-0 fw-bold" style={{ color: '#c5a059' }}>{new Intl.NumberFormat('vi-VN').format(finalOrder.total)}đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Legal */}
                    <div className="mt-5 pt-5">
                        <div className="row g-5">
                            <div className="col-8">
                                <div className="p-4 border border-dashed text-muted" style={{ fontSize: '0.75rem', lineHeight: 1.6 }}>
                                    <p className="fw-bold uppercase mb-2 ls-1 text-dark">Terms & Conditions</p>
                                    1. Warranty: 12 months for manufacturing defects.<br/>
                                    2. Return Policy: Within 30 days in original condition.<br/>
                                    3. Delivery: Scheduled within 3-5 business days.<br/>
                                    4. This is a computer-generated document and is valid without signature.
                                </div>
                            </div>
                            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                                <div className="mb-3 text-muted small uppercase ls-2 fw-bold">Authenticity Seal</div>
                                <div className="p-2 border border-2 border-dark d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px', borderRadius: '50%', transform: 'rotate(-15deg)', opacity: 0.6 }}>
                                    <div className="text-center fw-bold" style={{ fontSize: '0.6rem' }}>
                                        LUXLIFE<br/>ORIGINAL<br/>2026
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center mt-5 pt-5 opacity-50">
                            <p className="small ls-5 uppercase">www.luxlife-furniture.vn</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-master-v2 bg-white pb-5">
            <div className="container py-5">
                <div className="d-flex align-items-center justify-content-between mb-5 pb-4 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                        <button onClick={() => setView('store')} className="btn-back-minimal">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h2 className="brand-font m-0 h1">Thanh Toán</h2>
                    </div>
                    <div className="checkout-steps d-none d-md-flex gap-4">
                        <span className="step-item active">01 GIỎ HÀNG</span>
                        <span className="step-item active">02 THÔNG TIN</span>
                        <span className="step-item">03 HOÀN TẤT</span>
                    </div>
                </div>

                <div className="row g-5">
                    <div className="col-lg-7">
                        <section className="checkout-section mb-5">
                            <h4 className="ls-3 uppercase fw-bold mb-4" style={{ fontSize: '0.9rem' }}>1. Địa chỉ giao hàng</h4>
                            <form id="checkout-form" onSubmit={handleSubmit} className="row g-4">
                                <div className="col-md-6">
                                    <div className="lux-input-group">
                                        <label>HỌ VÀ TÊN</label>
                                        <input name="name" onChange={handleInputChange} required placeholder="Ví dụ: Nguyễn Văn A" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="lux-input-group">
                                        <label>SỐ ĐIỆN THOẠI</label>
                                        <input name="phone" onChange={handleInputChange} type="tel" required placeholder="09xx xxx xxx" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="lux-input-group">
                                        <label>ĐỊA CHỈ NHẬN HÀNG</label>
                                        <input name="address" onChange={handleInputChange} required placeholder="Số nhà, tên đường, phường/xã..." />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="lux-input-group">
                                        <label>GHI CHÚ (TÙY CHỌN)</label>
                                        <textarea name="note" onChange={handleInputChange} rows="2" placeholder="Lưu ý cho người giao hàng..."></textarea>
                                    </div>
                                </div>
                            </form>
                        </section>

                        <section className="checkout-section">
                            <h4 className="ls-3 uppercase fw-bold mb-4" style={{ fontSize: '0.9rem' }}>2. Phương thức thanh toán</h4>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className={`pay-card ${payMethod === 'cod' ? 'active' : ''}`} onClick={() => setPayMethod('cod')}>
                                        <div className="pay-card-header">
                                            <i className="fas fa-truck-loading"></i>
                                            <div className="pay-check"></div>
                                        </div>
                                        <div className="pay-card-body">
                                            <h6 className="fw-bold mb-1">COD</h6>
                                            <p className="small text-muted m-0">Thanh toán khi nhận hàng</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={`pay-card ${payMethod === 'bank' ? 'active' : ''}`} onClick={() => setPayMethod('bank')}>
                                        <div className="pay-card-header">
                                            <i className="fas fa-university"></i>
                                            <div className="pay-check"></div>
                                        </div>
                                        <div className="pay-card-body">
                                            <h6 className="fw-bold mb-1">BANKING</h6>
                                            <p className="small text-muted m-0">Chuyển khoản qua VietQR</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {payMethod === 'bank' && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="qr-container mt-4">
                                        <div className="bg-light p-4 d-flex flex-column flex-md-row align-items-center gap-4 border">
                                            <div className="qr-box bg-white p-2 border">
                                                <img src={qrUrl} alt="VietQR" style={{ width: '180px' }} />
                                            </div>
                                            <div className="qr-details flex-grow-1">
                                                <p className="small mb-2 text-muted uppercase ls-1 fw-bold">Thông tin chuyển khoản:</p>
                                                <div className="d-flex justify-content-between border-bottom py-2">
                                                    <span className="small text-muted">Ngân hàng:</span>
                                                    <span className="small fw-bold">MB BANK</span>
                                                </div>
                                                <div className="d-flex justify-content-between border-bottom py-2">
                                                    <span className="small text-muted">Số tài khoản:</span>
                                                    <span className="small fw-bold">{accountNo}</span>
                                                </div>
                                                <div className="d-flex justify-content-between border-bottom py-2">
                                                    <span className="small text-muted">Chủ TK:</span>
                                                    <span className="small fw-bold uppercase">{accountName}</span>
                                                </div>
                                                <div className="d-flex justify-content-between py-2">
                                                    <span className="small text-muted">Nội dung:</span>
                                                    <span className="small fw-bold text-primary">{addInfo}</span>
                                                </div>
                                                <p className="mt-3 small text-danger italic"><i className="fas fa-info-circle me-1"></i> Vui lòng giữ nguyên nội dung chuyển khoản để đơn hàng được xác nhận tự động.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>
                    </div>

                    <aside className="col-lg-5">
                        <div className="order-summary-box border p-4 p-md-5 sticky-top" style={{ top: '100px', backgroundColor: '#fafafa' }}>
                            <h4 className="brand-font mb-4 pb-2 border-bottom">Tóm tắt đơn hàng</h4>
                            <div className="summary-items scrollbar-hide mb-4" style={{ maxHeight: '300px' }}>
                                {cart.map(i => (
                                    <div key={i.id} className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="pos-rel">
                                                <img src={i.image} style={{ width: '125px', height: '125px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
                                                <span className="summary-qty-badge">{i.qty}</span>
                                            </div>
                                            <span className="small fw-bold">{i.name}</span>
                                        </div>
                                        <span className="small fw-bold">{new Intl.NumberFormat('vi-VN').format(i.price * i.qty)}đ</span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-totals border-top pt-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted small">Tạm tính</span>
                                    <span className="small fw-bold">{new Intl.NumberFormat('vi-VN').format(total)}đ</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="text-muted small">Phí vận chuyển</span>
                                    <span className="small text-success fw-bold">MIỄN PHÍ</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-end">
                                    <span className="h6 m-0 fw-bold">TỔNG CỘNG</span>
                                    <div className="text-end">
                                        <p className="text-gold h3 fw-bold m-0">{new Intl.NumberFormat('vi-VN').format(total)}đ</p>
                                        <p className="small text-muted m-0 italic" style={{ fontSize: '0.65rem' }}>Đã bao gồm thuế VAT</p>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" form="checkout-form" className="btn-lux-black w-100 py-4 mt-5 d-flex align-items-center justify-content-center gap-3">
                                XÁC NHẬN ĐẶT HÀNG <i className="fas fa-chevron-right small"></i>
                            </button>
                            
                            <div className="mt-4 text-center">
                                <p className="small text-muted m-0" style={{ fontSize: '0.7rem' }}>
                                    <i className="fas fa-shield-alt me-2"></i> Thanh toán an toàn và bảo mật 100%
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
