import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INITIAL_PRODUCTS, CATEGORIES } from './constants';

// Lazy load heavy components
const Contact = lazy(() => import('./components/Contact'));
const Projects = lazy(() => import('./components/Projects'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const Auth = lazy(() => import('./components/Auth'));
const Checkout = lazy(() => import('./components/Checkout'));

// Standard imports for core UI
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { ProductCard } from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';

// Memoize stable UI components
const MemoizedHero = React.memo(Hero);
const MemoizedFooter = React.memo(Footer);
const MemoizedProductCard = React.memo(ProductCard);

const App = () => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lux_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [user, setUser] = useState(null);
  const [view, setView] = useState('store'); // 'auth', 'store', 'admin', 'checkout'
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('lux_orders');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'ORD001', customer: 'Nguyễn Văn A', total: 12500000, date: '2026-04-26', status: 'Hoàn thành' },
      { id: 'ORD002', customer: 'Trần Thị B', total: 24500000, date: '2026-04-27', status: 'Đang xử lý' },
    ];
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lux_users');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, username: 'admin', password: '1', role: 'admin', name: 'Quản trị viên', phone: '0999999999' }
    ];
  });
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('lux_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lux_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lux_users', JSON.stringify(users));
  }, [users]);

  // Restore user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lux_user');
    if (saved) { 
        const u = JSON.parse(saved);
        setUser(u); 
        if (u.role === 'admin') setView('admin');
        else setView('store');
    }
  }, []);

  const handleAuth = useCallback((e) => {
    e.preventDefault();
    setAuthError('');
    const formData = new FormData(e.target);
    const fullName = formData.get('fullname');
    const username = formData.get('username');
    const phone = formData.get('phone');
    const password = formData.get('password');
    
    if (authMode === 'signup') {
        if (users.find(u => u.username === username)) {
            setAuthError('Tên đăng nhập đã tồn tại!');
            return;
        }
        const newUser = { id: Date.now(), username, password, name: fullName, phone, role: 'user' };
        setUsers(prev => [...prev, newUser]);
        setUser(newUser);
        localStorage.setItem('lux_user', JSON.stringify(newUser));
        setView('store');
    } else {
        const found = users.find(u => u.username === username && u.password === password);
        if (found) {
            setUser(found);
            localStorage.setItem('lux_user', JSON.stringify(found));
            if (found.role === 'admin') setView('admin');
            else setView('store');
        } else {
            setAuthError('Sai tên đăng nhập hoặc mật khẩu!');
        }
    }
  }, [authMode, users]);

  const addToCart = useCallback((p, qty = 1) => {
    if (!user) {
      setView('auth');
      return;
    }
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + qty } : item);
      return [...prev, { ...p, qty }];
    });
    setIsCartOpen(true);
  }, [user]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  }, []);

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  const { currentProducts, totalPages } = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = products.filter(p => 
      (activeCat === "Tất cả" || p.category === activeCat) &&
      (p.name.toLowerCase().includes(lowerSearch))
    );
    const totalPages = Math.ceil(filtered.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return {
        currentProducts: filtered.slice(indexOfFirstProduct, indexOfLastProduct),
        totalPages
    };
  }, [products, activeCat, searchTerm, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCat, searchTerm]);

  const addProduct = (p) => setProducts([p, ...products]);
  const updateProduct = (p) => setProducts(products.map(item => item.id === p.id ? p : item));
  const deleteProduct = (id) => setProducts(products.filter(item => item.id !== id));

  const addOrder = (order) => setOrders([order, ...orders]);
  const clearCart = useCallback(() => setCart([]), []);

  const addUser = (u) => setUsers(prev => [...prev, u]);
  const editUser = (u) => setUsers(prev => prev.map(item => item.id === u.id ? u : item));
  const deleteUser = (id) => setUsers(prev => prev.filter(item => item.id !== id));


  return (
    <div className="lux-master-app bg-white">
      <Suspense fallback={<div className="d-flex align-items-center justify-content-center" style={{height:'100vh'}}></div>}>
        <AnimatePresence>
          
          {view === 'auth' && (
            <Auth 
                authMode={authMode} 
                setAuthMode={(mode) => { setAuthMode(mode); setAuthError(''); }} 
                handleAuth={handleAuth} 
                setView={setView} 
                authError={authError}
            />
          )}

          {view === 'admin' && (
            <AdminDashboard 
                onLogout={() => { localStorage.removeItem('lux_user'); setUser(null); setView('auth'); }}
                products={products}
                orders={orders}
                users={users}
                onAdd={addProduct}
                onEdit={updateProduct}
                onDelete={deleteProduct}
                onAddUser={addUser}
                onEditUser={editUser}
                onDeleteUser={deleteUser}
                onGoToStore={() => setView('store')}
            />
          )}

          {view === 'store' && (
            <motion.div key="store" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Header 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                cartCount={cart.length} 
                user={user} 
                setUser={setUser}
                setView={setView} 
                setIsCartOpen={setIsCartOpen}
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
              />
              
              <MemoizedHero />

              {/* Main Content */}
              <div className="container py-5">
                <div className="row g-5">
                    <aside className="col-lg-3">
                        <div className="sidebar-section mb-5">
                            <h5 className="sidebar-title-master ls-2 mb-4">DANH MỤC</h5>
                            <ul className="cat-list-master">
                                {CATEGORIES.map(c => (
                                    <li key={c} className={activeCat === c ? "active" : ""} onClick={() => setActiveCat(c)}>
                                        {c} Nội Thất
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className="col-lg-9">
                        <div className="grid-header d-flex justify-content-between align-items-center mb-5">
                            <h3 className="brand-font">Sản Phẩm Cao Cấp</h3>
                        </div>
                        <div className="sidebar-promo-banner mt-5 shadow-sm rounded overflow-hidden position-relative">
                            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80" alt="Promo" className="w-100 object-fit-cover" style={{ height: '350px' }} />
                            <div className="position-absolute bottom-0 end-0 bg-dark text-white p-4" style={{ zIndex: 2 }}>
                                <h5 className="brand-font m-0 text-center" style={{ fontSize: '2.5rem', letterSpacing: '4px', fontWeight: 800 }}>COLLECTION<br/>2026</h5>
                            </div>
                        </div>
                        <div className="row g-4 mt-4">
                            {currentProducts.map((p) => (
                                <div key={p.id} className="col-md-6 col-xl-4">
                                    <MemoizedProductCard p={p} onOpen={() => setSelectedProduct(p)} onAdd={addToCart} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination UI */}
                        {totalPages > 1 && (
                            <div className="d-flex justify-content-center align-items-center gap-3 mt-10">
                                <button 
                                    className="btn btn-outline-dark rounded-0 px-4 py-2 ls-2 small uppercase fw-bold"
                                    disabled={currentPage === 1}
                                    onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                                    style={{ opacity: currentPage === 1 ? 0.3 : 1 }}
                                >
                                    <i className="fas fa-chevron-left me-2"></i> TRƯỚC
                                </button>
                                
                                <div className="d-flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                                            className={`btn rounded-0 px-3 py-2 fw-bold ${currentPage === i + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
                                            style={{ minWidth: '45px' }}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    className="btn btn-outline-dark rounded-0 px-4 py-2 ls-2 small uppercase fw-bold"
                                    disabled={currentPage === totalPages}
                                    onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                                    style={{ opacity: currentPage === totalPages ? 0.3 : 1 }}
                                >
                                    SAU <i className="fas fa-chevron-right ms-2"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
              </div>

              <Projects />
              <Contact />
              <MemoizedFooter />
            </motion.div>
          )}

          {view === 'checkout' && (
            <Checkout cart={cart} total={total} setView={setView} clearCart={clearCart} addOrder={addOrder} />
          )}
        </AnimatePresence>

        {/* Overlays */}
        <AnimatePresence>
            {selectedProduct && (
                <ProductDetail 
                    p={selectedProduct} 
                    onClose={() => setSelectedProduct(null)} 
                    onAdd={addToCart} 
                />
            )}
        </AnimatePresence>

        <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cart={cart} 
            total={total} 
            onRemove={removeFromCart} 
            onUpdateQty={updateQty}
            onCheckout={() => { 
                if (!user) {
                    setIsCartOpen(false);
                    setView('auth');
                    return;
                }
                setIsCartOpen(false); 
                setView('checkout'); 
            }}
        />

        {/* Global User Menu - Forced Top Layer */}
        <AnimatePresence>
            {showUserMenu && user && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 20000, backgroundColor: 'rgba(0,0,0,0.05)' }} 
                        onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="shadow-lg bg-white p-4" 
                        style={{ 
                            position: 'fixed', right: '20px', top: '80px', minWidth: '250px', 
                            zIndex: 20001, border: '1px solid #111', 
                            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div className="small ls-2 text-muted mb-3 pb-2 border-bottom fw-bold" style={{ fontSize: '0.7rem' }}>
                            TÀI KHOẢN: {user.name.toUpperCase()}
                        </div>
                        {user.role === 'admin' && (
                            <button onClick={() => {setView('admin'); setShowUserMenu(false);}} className="btn btn-link text-dark text-decoration-none w-100 text-start small ls-1 p-2 fw-bold d-block mb-2 border-0 hover-gold">
                                <i className="fas fa-cog me-2"></i> TRANG QUẢN TRỊ
                            </button>
                        )}
                        <button 
                            onClick={() => { localStorage.removeItem('lux_user'); setUser(null); setView('store'); setShowUserMenu(false); }} 
                            className="btn btn-dark w-100 text-center small ls-2 p-3 fw-bold d-block border-0 mt-2"
                        >
                            <i className="fas fa-sign-out-alt me-2"></i> ĐĂNG XUẤT NGAY
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default App;
