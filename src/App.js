
import './App.css';
import { useEffect, useState } from 'react';
import ProductUpload from './ProductUpload';
import Register from './Register';
import Login from './Login';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

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

  // 搜尋與分頁
  const filtered = products.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) ||
         (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <div className="App">
      <h1>商城商品展示</h1>
      <div style={{display:'flex',gap:'32px',justifyContent:'center',marginBottom:'40px',flexWrap:'wrap'}}>
        <Register />
        <Login />
      </div>
      <ProductUpload onUpload={fetchProducts} />
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="搜尋商品名稱或描述..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      {loading && <p>載入中...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div className="product-grid">
        {paged.length > 0 ? (
          paged.map(product => (
            <div className="product-card" key={product.id}>
              {product.image_url && <img src={product.image_url} alt={product.name} className="product-img" />}
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-desc">{product.description}</div>
              </div>
            </div>
          ))
        ) : (
          !loading && <div className="product-empty">暫無商品資料</div>
        )}
      </div>
      {/* 分頁按鈕 */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({length: totalPages}, (_, i) => (
            <button
              key={i+1}
              className={page === i+1 ? 'page-btn active' : 'page-btn'}
              onClick={() => setPage(i+1)}
            >{i+1}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
