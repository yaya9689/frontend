import React, { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile';
import Cart from './Cart';
import ProductUpload from './ProductUpload';
import ProductList from './ProductList';
import Announcement from './Announcement';
import CategorySearch from './CategorySearch';
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = React.useState(false);
  const [loginMode, setLoginMode] = React.useState('login'); // login or register

  const fetchProducts = () => {
    setLoading(true);
    fetch('https://car-studio-production.up.railway.app/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
          setError('取得商品失敗：資料格式錯誤');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('取得商品失敗');
        setProducts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [category, setCategory] = React.useState('全部');

  const handleAddToCart = product => {
    setCart(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };
  const handleRemoveFromCart = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  const handleCheckout = () => {
    setCart([]);
  };

  return (
    <div className="App">
      <div className="header-bar">
        <div className="header-logo">包裹</div>
        <div className="header-nav">
          <button className="header-login-btn" onClick={()=>{setShowLogin(true);setLoginMode('login')}}>登入</button>
        </div>
      </div>
      {showLogin && (
        <div className="login-modal-bg" onClick={()=>setShowLogin(false)}>
          <div className="login-modal" onClick={e=>e.stopPropagation()}>
            {loginMode === 'login' ? <Login /> : <Register />}
            <div style={{marginTop:'18px',display:'flex',gap:'12px'}}>
              {loginMode === 'login' ? (
                <button className="login-modal-switch" onClick={()=>setLoginMode('register')}>註冊新帳號</button>
              ) : (
                <button className="login-modal-switch" onClick={()=>setLoginMode('login')}>已有帳號？登入</button>
              )}
              <button className="login-modal-close" onClick={()=>setShowLogin(false)}>關閉</button>
            </div>
          </div>
        </div>
      )}
      <Announcement />
      <div className="hero">
        <div className="hero-title">
          你的市場<br />
          <span className="hero-brand">Roblox 資產</span>
        </div>
        <div className="hero-sub">
          發掘來自值得信賴創作者的高品質 Roblox 資產，自信地買賣。
        </div>
        <div className="hero-btn-group">
          <button className="hero-btn primary">探索產品</button>
          <button className="hero-btn secondary">開始銷售</button>
        </div>
      </div>
      <div className="divider" />
      <div className="section-title main-section-title">近期發行</div>
      <CategorySearch
        onCategoryChange={setCategory}
        onSearch={setSearch}
      />
      {/* 商品列表傳入 category, search 狀態 */}
      <ProductList
        products={products}
        loading={loading}
        error={error}
        search={search}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        onAddToCart={handleAddToCart}
        category={category}
      />
      {/* 會員功能區塊（橫向排列） */}
      <div className="main-row" style={{alignItems:'flex-start'}}>
        <div style={{display:'flex',gap:'32px',flex:2}}>
          <Register />
          <UserProfile />
        </div>
        <div style={{minWidth:340,maxWidth:400,flex:1}}>
          <Cart cartItems={cart} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
          <ProductUpload onUpload={fetchProducts} />
        </div>
      </div>
    </div>
  );
}

export default App;
