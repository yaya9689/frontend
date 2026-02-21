
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
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('取得商品失敗');
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>商城商品展示</h1>
      {loading && <p>載入中...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price}<br/>
            <span>{product.description}</span>
            {product.image_url && <img src={product.image_url} alt={product.name} style={{width:100}} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
