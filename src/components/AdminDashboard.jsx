import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ["Tất cả", "Ghế", "Bàn", "Đèn", "Sofa", "Giường", "Kệ"];

// Dummy data for Customers
const DUMMY_CUSTOMERS = [
    { id: 1, name: 'Nguyễn Văn A', email: 'vana@gmail.com', phone: '0901234567', totalSpent: 45000000 },
    { id: 2, name: 'Trần Thị B', email: 'thib@gmail.com', phone: '0912345678', totalSpent: 12800000 },
    { id: 3, name: 'Lê Văn C', email: 'vanc@gmail.com', phone: '0987654321', totalSpent: 5200000 },
    { id: 4, name: 'Phạm Minh H', email: 'minhhieu@gmail.com', phone: '0934079868', totalSpent: 150000000 },
];

const AdminDashboard = ({ onLogout, products, orders, onAdd, onEdit, onDelete }) => {
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'orders', 'customers'
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

    const renderOverview = () => (
        <>
            <header className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="brand-font m-0">Tổng Quan Hệ Thống</h2>
                <div className="d-flex gap-3 text-muted small fw-bold uppercase ls-1">
                    Hôm nay, 27 Tháng 4, 2026
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

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="bg-white p-4 shadow-sm">
                        <h5 className="mb-4 fw-bold small ls-2 uppercase">Sản Phẩm Vừa Cập Nhật</h5>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Sản Phẩm</th>
                                        <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Giá Bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.slice(0, 5).map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <img src={p.image} style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="" />
                                                    <span className="fw-bold small">{p.name}</span>
                                                </div>
                                            </td>
                                            <td className="fw-bold small">{new Intl.NumberFormat('vi-VN').format(p.price)}đ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-white p-4 shadow-sm h-100">
                        <h5 className="mb-4 fw-bold small ls-2 uppercase">Trạng Thái Kho</h5>
                        <div className="d-flex flex-column gap-3">
                            {CATEGORIES.slice(1, 6).map(c => (
                                <div key={c} className="d-flex justify-content-between align-items-center">
                                    <span className="small text-muted">{c} Nội Thất</span>
                                    <span className="badge bg-light text-dark border">{Math.floor(Math.random() * 20) + 5}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderProducts = () => (
        <>
            <header className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="brand-font m-0">Quản Lý Sản Phẩm</h2>
                <button onClick={() => handleOpenForm()} className="btn btn-dark rounded-0 px-4 small ls-1"><i className="fas fa-plus me-2"></i> THÊM MỚI</button>
            </header>

            <div className="bg-white p-4 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Hình Ảnh</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Tên Sản Phẩm</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Phân Loại</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Giá Bán</th>
                                <th className="small ls-1 uppercase fw-bold text-end" style={{ fontSize: '0.65rem' }}>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td><img src={p.image} style={{ width: '50px', height: '50px', objectFit: 'cover' }} alt="" /></td>
                                    <td><span className="fw-bold small">{p.name}</span></td>
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
        </>
    );

    const renderOrders = () => (
        <>
            <header className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="brand-font m-0">Quản Lý Đơn Hàng</h2>
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-dark rounded-0 active">Tất cả</button>
                    <button className="btn btn-sm btn-outline-dark rounded-0">Chờ duyệt</button>
                    <button className="btn btn-sm btn-outline-dark rounded-0">Đã giao</button>
                </div>
            </header>

            <div className="bg-white p-4 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Mã ĐH</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Khách Hàng</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Ngày Đặt</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Tổng Tiền</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Trạng Thái</th>
                                <th className="small ls-1 uppercase fw-bold text-end" style={{ fontSize: '0.65rem' }}>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o.id}>
                                    <td className="fw-bold small">{o.id}</td>
                                    <td className="small">{o.customer}</td>
                                    <td className="small text-muted">{o.date}</td>
                                    <td className="fw-bold small">{new Intl.NumberFormat('vi-VN').format(o.total)}đ</td>
                                    <td>
                                        <span className={`badge rounded-0 small uppercase ls-1 ${o.status === 'Hoàn thành' ? 'bg-success' : o.status === 'Đang xử lý' ? 'bg-warning text-dark' : 'bg-danger'}`} style={{ fontSize: '0.6rem' }}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-dark rounded-0"><i className="fas fa-eye"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

    const renderCustomers = () => (
        <>
            <header className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="brand-font m-0">Quản Lý Khách Hàng</h2>
                <button className="btn btn-dark rounded-0 px-4 small ls-1"><i className="fas fa-user-plus me-2"></i> THÊM KHÁCH HÀNG</button>
            </header>

            <div className="bg-white p-4 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Khách Hàng</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Liên Hệ</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Số Điện Thoại</th>
                                <th className="small ls-1 uppercase fw-bold" style={{ fontSize: '0.65rem' }}>Tổng Chi Tiêu</th>
                                <th className="small ls-1 uppercase fw-bold text-end" style={{ fontSize: '0.65rem' }}>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DUMMY_CUSTOMERS.map(c => (
                                <tr key={c.id}>
                                    <td><span className="fw-bold small">{c.name}</span></td>
                                    <td className="small text-muted">{c.email}</td>
                                    <td className="small">{c.phone}</td>
                                    <td className="fw-bold small text-gold">{new Intl.NumberFormat('vi-VN').format(c.totalSpent)}đ</td>
                                    <td className="text-end">
                                        <button className="btn btn-sm btn-outline-dark rounded-0 me-2"><i className="fas fa-envelope"></i></button>
                                        <button className="btn btn-sm btn-outline-danger rounded-0"><i className="fas fa-ban"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

    return (
        <div className="admin-master d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <aside className="admin-sidebar bg-dark text-white p-4" style={{ width: '280px', position: 'sticky', top: 0, height: '100vh' }}>
                <div className="brand-lux-main mb-5 d-flex align-items-center gap-2">
                    <div style={{ backgroundColor: '#c5a059', color: '#111', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>A</div>
                    <span className="small ls-3 fw-bold text-white">LUX ADMIN</span>
                </div>
                <nav className="d-flex flex-column gap-2">
                    <button onClick={() => setActiveTab('overview')} className={`btn btn-link text-white text-decoration-none text-start p-3 rounded-0 small ls-1 d-flex align-items-center gap-3 ${activeTab === 'overview' ? 'bg-secondary bg-opacity-25' : 'hover-white-bg'}`}>
                        <i className="fas fa-chart-line" style={{ width: '20px' }}></i> TỔNG QUAN
                    </button>
                    <button onClick={() => setActiveTab('products')} className={`btn btn-link text-white-50 text-decoration-none text-start p-3 rounded-0 small ls-1 d-flex align-items-center gap-3 ${activeTab === 'products' ? 'bg-secondary bg-opacity-25 text-white' : 'hover-white-bg'}`}>
                        <i className="fas fa-box" style={{ width: '20px' }}></i> SẢN PHẨM
                    </button>
                    <button onClick={() => setActiveTab('orders')} className={`btn btn-link text-white-50 text-decoration-none text-start p-3 rounded-0 small ls-1 d-flex align-items-center gap-3 ${activeTab === 'orders' ? 'bg-secondary bg-opacity-25 text-white' : 'hover-white-bg'}`}>
                        <i className="fas fa-shopping-cart" style={{ width: '20px' }}></i> ĐƠN HÀNG
                    </button>
                    <button onClick={() => setActiveTab('customers')} className={`btn btn-link text-white-50 text-decoration-none text-start p-3 rounded-0 small ls-1 d-flex align-items-center gap-3 ${activeTab === 'customers' ? 'bg-secondary bg-opacity-25 text-white' : 'hover-white-bg'}`}>
                        <i className="fas fa-users" style={{ width: '20px' }}></i> KHÁCH HÀNG
                    </button>
                    
                    <div className="mt-5 pt-5">
                        <button className="btn btn-link text-white-50 text-decoration-none text-start p-3 rounded-0 small ls-1 d-flex align-items-center gap-3 hover-white-bg w-100" onClick={onLogout}>
                            <i className="fas fa-sign-out-alt" style={{ width: '20px' }}></i> ĐĂNG XUẤT
                        </button>
                    </div>
                </nav>
            </aside>

            <main className="flex-grow-1 p-5">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'products' && renderProducts()}
                {activeTab === 'orders' && renderOrders()}
                {activeTab === 'customers' && renderCustomers()}
            </main>

            {/* FORM MODAL (ONLY FOR PRODUCTS FOR NOW) */}
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

export default AdminDashboard;
