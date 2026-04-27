import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="hero-slider-main" style={{ minHeight: '100vh', backgroundColor: '#faf9f6', display: 'flex', alignItems: 'center', paddingTop: '10rem', paddingBottom: '10rem', overflow: 'visible !important' }}>
            <div className="container" style={{ overflow: 'visible' }}>
                <div className="row align-items-center" style={{ overflow: 'visible' }}>
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
                    <div className="col-lg-6 offset-lg-1 d-none d-lg-block" style={{ overflow: 'visible' }}>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }} 
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }} 
                            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} 
                            style={{ position: 'relative', padding: '40px', perspective: '1500px' }}
                        >
                            {/* Main Image with 3D Pop */}
                            <motion.img 
                                whileHover={{ scale: 1.02, rotateX: -2, rotateY: 2 }}
                                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" 
                                alt="Luxury Interior" 
                                style={{ 
                                    width: '100%', height: 'auto', display: 'block', position: 'relative', 
                                    zIndex: 1, borderRadius: '4px', 
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                                    cursor: 'none'
                                }} 
                            />
                            
                            {/* Decorative Floating Label */}
                            <div style={{ 
                                position: 'absolute', bottom: '20px', right: '10px', zIndex: 5,
                                backgroundColor: '#111', color: '#fff', padding: '25px 45px',
                                fontSize: '0.9rem', fontWeight: 800, letterSpacing: '4px'
                            }}>
                                COLLECTION 2026
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
