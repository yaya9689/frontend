
import './App.css';
import { useEffect, useState } from 'react';
import ProductUpload from './ProductUpload';
import Register from './Register';
import Login from './Login';
import ProductList from './ProductList';

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

  // ...existing code...

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
      <ProductList
        products={products}
        loading={loading}
        error={error}
        search={search}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
      />
    </div>
  );
}

export default App;
