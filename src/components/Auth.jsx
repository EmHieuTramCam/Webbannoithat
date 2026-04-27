import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = ({ authMode, setAuthMode, handleAuth, setView }) => {
    return (
        <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="auth-full-screen">
            <div className="auth-split-box" style={{ height: '100vh', overflow: 'hidden' }}>
                <div className="auth-visual-side d-none d-lg-block col-lg-7 p-0 position-relative h-100 overflow-hidden">
                    <AnimatePresence>
                        <motion.img 
                            key={authMode}
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
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
    );
};

export default Auth;
