import React, { useState } from 'react';

const Header = ({ searchTerm, setSearchTerm, cartCount, user, setUser, setView, setIsCartOpen, showUserMenu, setShowUserMenu }) => {
    const handleLogout = (e) => {
        if (e) e.preventDefault();
        localStorage.removeItem('lux_user');
        setUser(null);
        setView('store');
        setShowUserMenu(false);
    };

    return (
        <header className="main-header-lux sticky-top" style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.04)', padding: '1.2rem 0', zIndex: 9999, overflow: 'visible' }}>
            <div className="container d-flex align-items-center justify-content-between" style={{ overflow: 'visible' }}>
                <div className="header-left d-flex align-items-center gap-5">
                    <a href="#" className="brand-lux-main m-0 d-flex align-items-center gap-2 text-decoration-none" onClick={(e) => { e.preventDefault(); setView('store'); }}>
                        <div style={{ backgroundColor: '#111', color: '#fff', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px' }}>L</div>
                        <span style={{ fontSize: '1.6rem', letterSpacing: '4px', fontWeight: 700, color: '#111' }}>UX<span style={{ fontWeight: 300 }}>MODERN</span></span>
                    </a>
                    
                    <nav className="nav-links-lux d-none d-lg-flex gap-4 small" style={{ letterSpacing: '1.5px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#555', fontWeight: 500 }}>
                        <a href="#home" className="text-decoration-none text-dark">TRANG CHỦ</a>
                        <a href="#new-collection" className="text-decoration-none text-dark">BST MỚI</a>
                        <a href="#projects" className="text-decoration-none text-dark">DỰ ÁN</a>
                        <a href="#contact" className="text-decoration-none text-dark">LIÊN HỆ</a>
                    </nav>
                </div>

                <div className="header-right d-flex align-items-center gap-4" style={{ overflow: 'visible' }}>
                    <div className="search-minimal d-none d-md-flex align-items-center" style={{ borderBottom: '1px solid #ddd', paddingBottom: '2px' }}>
                        <input placeholder="Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', width: '150px', fontWeight: 300, color: '#333' }} />
                        <i className="fas fa-search text-muted ms-2" style={{ fontSize: '0.85rem', cursor: 'pointer' }}></i>
                    </div>
                    
                    <div className="cursor-pointer pos-rel mx-2" onClick={() => setIsCartOpen(true)}>
                        <i className="fas fa-shopping-bag" style={{ color: '#111', fontSize: '1.1rem' }}></i>
                        {cartCount > 0 && <span className="cart-badge-dot">{cartCount}</span>}
                    </div>
                    
                    {user ? (
                        <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)} style={{ padding: '8px 12px', backgroundColor: showUserMenu ? '#f0f0f0' : 'transparent', borderRadius: '4px', transition: 'all 0.2s' }}>
                                <span className="small ls-1 d-none d-lg-block fw-bold" style={{ fontSize: '0.7rem', color: '#111' }}>{user.name.split(' ')[0].toUpperCase()}</span>
                                <i className="fas fa-user-circle" style={{ color: '#111', fontSize: '1.6rem' }}></i>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => setView('auth')} className="btn btn-link text-dark p-0"><i className="fas fa-user-circle" style={{ color: '#111', fontSize: '1.2rem' }}></i></button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
