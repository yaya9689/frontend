
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
      <h1>商城商品展示</h1>
      <div style={{display:'flex',gap:'32px',justifyContent:'center',marginBottom:'40px',flexWrap:'wrap'}}>
        <Register />
        <Login />
        <UserProfile />
        <Cart cartItems={cart} onRemove={handleRemoveFromCart} onCheckout={handleCheckout} />
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
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
