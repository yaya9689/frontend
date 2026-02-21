
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="App">
      <h1>商城商品展示</h1>
      {loading && <p>載入中...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.price}<br/>
              <span>{product.description}</span>
              {product.image_url && <img src={product.image_url} alt={product.name} style={{width:100}} />}
            </li>
          ))
        ) : (
          !loading && <li>暫無商品資料</li>
        )}
      </ul>
    </div>
  );
}

export default App;
