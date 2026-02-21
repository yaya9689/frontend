import React from 'react';

function ProductList({ products, loading, error, search, page, pageSize, setPage, onAddToCart }) {
  // 搜尋與分頁
  const filtered = products.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) ||
         (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  // 假資料：分類、評價、收藏狀態
  const getCategory = p => p.category || '車輛';
  const getRating = p => p.rating || 5;
  const getReviews = p => p.reviews || 2;
  const isFavorite = p => p.favorite || false;

  return (
    <>
      {loading && <p>載入中...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div className="product-grid">
        {paged.length > 0 ? (
          paged.map(product => (
            <div className="product-card" key={product.id}>
              <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:8}}>
                <span className="product-tag">{getCategory(product)}</span>
                <button className={isFavorite(product) ? 'fav-btn active' : 'fav-btn'} title="收藏">♥</button>
              </div>
              {product.image_url && <img src={product.image_url} alt={product.name} className="product-img" />}
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">雷亞幣 {product.price}</div>
                <div className="product-desc">{product.description}</div>
                <div className="product-rating">
                  {Array.from({length: getRating(product)}, (_, i) => <span key={i} style={{color:'#ffcb5b'}}>★</span>)}
                  <span style={{color:'#aaa',marginLeft:6}}>{getReviews(product)} 篇評價</span>
                </div>
                <button className="cart-btn" onClick={()=>onAddToCart(product)}>加入購物車</button>
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
    </>
  );
}

export default ProductList;
