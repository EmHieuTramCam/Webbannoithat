import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" style={{ 
            position: 'relative',
            backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            padding: '120px 0'
        }}>
            {/* Dark Overlay for Readability */}
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 0 }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="row g-0">
                            {/* Contact Info Side */}
                            <div className="col-lg-5 p-5 p-lg-10 d-flex flex-column justify-content-center" style={{ backgroundColor: 'rgba(17,17,17,0.8)', backdropFilter: 'blur(10px)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                                    <h6 className="ls-3 uppercase small mb-4" style={{ color: '#c5a059', fontWeight: 700 }}>LIÊN HỆ</h6>
                                    <h2 className="brand-font display-4 mb-5 text-white" style={{ letterSpacing: '-1px' }}>HÃY ĐỂ CHÚNG TÔI ĐỒNG HÀNH</h2>
                                    <p className="text-light opacity-75 mb-10 ls-1" style={{ lineHeight: '2', fontSize: '1rem' }}>
                                        Mỗi không gian là một câu chuyện riêng. Chúng tôi ở đây để giúp bạn viết nên chương tuyệt vời nhất cho ngôi nhà của mình.
                                    </p>

                                    <div className="d-flex flex-column gap-5">
                                        <div className="d-flex align-items-start gap-4">
                                            <i className="fas fa-map-marker-alt mt-1" style={{ color: '#c5a059', fontSize: '1.2rem' }}></i>
                                            <div>
                                                <div className="small ls-2 text-white uppercase mb-1" style={{ fontWeight: 700 }}>ĐỊA CHỈ TRỤ SỞ</div>
                                                <div className="text-light opacity-90 small">123 Đường Luxury, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start gap-4">
                                            <i className="fas fa-phone-alt mt-1" style={{ color: '#c5a059', fontSize: '1.2rem' }}></i>
                                            <div>
                                                <div className="small ls-2 text-white uppercase mb-1" style={{ fontWeight: 700 }}>ĐƯỜNG DÂY NÓNG</div>
                                                <div className="text-light opacity-90 h5 brand-font">0934 079 868</div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start gap-4">
                                            <i className="fas fa-envelope mt-1" style={{ color: '#c5a059', fontSize: '1.2rem' }}></i>
                                            <div>
                                                <div className="small ls-2 text-white uppercase mb-1" style={{ fontWeight: 700 }}>EMAIL TƯ VẤN</div>
                                                <div className="text-light opacity-90 small">contact@luxmodern.vn</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Form Side */}
                            <div className="col-lg-7 p-5 p-lg-10 bg-white shadow-2xl">
                                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                                    <form onSubmit={(e) => { e.preventDefault(); alert('Thông tin của bạn đã được gửi. Chúng tôi sẽ liên hệ lại trong vòng 24h!'); }}>
                                        <div className="row g-5">
                                            <div className="col-md-6">
                                                <div className="form-group border-bottom pb-2">
                                                    <label className="small ls-2 text-muted uppercase mb-2 fw-bold" style={{ fontSize: '0.6rem' }}>DANH XƯNG</label>
                                                    <input type="text" className="form-control border-0 rounded-0 p-0 fw-bold" placeholder="Họ và tên của bạn" required style={{ fontSize: '0.9rem', boxShadow: 'none' }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group border-bottom pb-2">
                                                    <label className="small ls-2 text-muted uppercase mb-2 fw-bold" style={{ fontSize: '0.6rem' }}>SỐ ĐIỆN THOẠI</label>
                                                    <input type="tel" className="form-control border-0 rounded-0 p-0 fw-bold" placeholder="09xx xxx xxx" required style={{ fontSize: '0.9rem', boxShadow: 'none' }} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group border-bottom pb-2">
                                                    <label className="small ls-2 text-muted uppercase mb-2 fw-bold" style={{ fontSize: '0.6rem' }}>BẠN QUAN TÂM ĐẾN</label>
                                                    <select className="form-select border-0 rounded-0 p-0 fw-bold cursor-pointer" style={{ fontSize: '0.9rem', boxShadow: 'none' }}>
                                                        <option>Thiết kế nội thất trọn gói</option>
                                                        <option>Thi công biệt thự / Nhà phố</option>
                                                        <option>Cung cấp nội thất cao cấp</option>
                                                        <option>Hợp tác đại lý</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-group border-bottom pb-2">
                                                    <label className="small ls-2 text-muted uppercase mb-2 fw-bold" style={{ fontSize: '0.6rem' }}>YÊU CẦU CHI TIẾT</label>
                                                    <textarea className="form-control border-0 rounded-0 p-0 fw-bold" placeholder="Hãy mô tả mong muốn của bạn..." style={{ fontSize: '0.9rem', minHeight: '120px', boxShadow: 'none', resize: 'none' }}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-5">
                                                <button type="submit" className="btn-lux-black w-100 py-4 ls-3 uppercase fw-bold" style={{ letterSpacing: '4px', fontSize: '0.75rem' }}>
                                                    GỬI YÊU CẦU NGAY
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
