import React from 'react';

function ProductList({ products, loading, error, search, page, pageSize, setPage }) {
  // 搜尋與分頁
  const filtered = products.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) ||
         (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <>
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
    </>
  );
}

export default ProductList;
