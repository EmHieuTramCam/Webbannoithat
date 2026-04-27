import React from 'react';

const Footer = () => (
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

export default Footer;
