import React, { useState, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import UserProfile from './UserProfile';
import Cart from './Cart';
import ProductUpload from './ProductUpload';
import ProductList from './ProductList';
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [cart, setCart] = useState([]);

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



    // 加入購物車
    const handleAddToCart = product => {
      setCart(prev => {
        if (prev.find(item => item.id === product.id)) return prev;
        return [...prev, product];
      });
    };
    // 移除購物車
    const handleRemoveFromCart = id => {
      setCart(prev => prev.filter(item => item.id !== id));
    };
    // 結帳
    const handleCheckout = () => {
      setCart([]);
    };

    return (
      <div className="App">
        {/* 主視覺區塊 */}
        <div className="hero">
          <div className="hero-title">你的市場<br /><span style={{color:'#ffcb5b'}}>Car Studio 資產</span></div>
          <div className="hero-sub">發掘來自值得信賴創作者的高品質車輛資產，自信地買賣。</div>
          <button className="hero-btn">探索產品</button>
          <button className="hero-btn" style={{background:'#23272a',color:'#ffcb5b',border:'2px solid #ffcb5b'}}>開始販售</button>
        </div>

        {/* 會員、購物車、上架區塊 */}
        <div className="main-row">
          <div style={{flex:2,display:'flex',gap:'32px'}}>
            <Register />
            <Login />
            <UserProfile />
          </div>
          <Cart cartItems={cart} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
        </div>
        <ProductUpload onUpload={fetchProducts} />

        {/* 搜尋列 */}
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="搜尋商品名稱或描述..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* 商品列表 */}
        <ProductList
          products={products}
          loading={loading}
          error={error}
          search={search}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onAddToCart={handleAddToCart}
        />
      </div>
    );
  }

  export default App;
