
import './App.css';
import { useEffect, useState } from 'react';
import ProductUpload from './ProductUpload';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="App">
      <h1>商城商品展示</h1>
      <ProductUpload onUpload={fetchProducts} />
      {loading && <p>載入中...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
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
    </div>
  );
}

export default App;
