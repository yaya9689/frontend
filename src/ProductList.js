import React from 'react';

function ProductList({ category = '全部', search = '' }) {
  // 假資料 demo
  const products = [
    { id: 1, name: '雷亞斯49', category: '車輛', desc: '收費站', price: 49, img: 'https://via.placeholder.com/320x160?text=車輛', author: 'DEV SHOP', rating: 5 },
    { id: 2, name: '雷亞斯20', category: '軍事', desc: '軍事品', price: 20, img: 'https://via.placeholder.com/320x160?text=軍事', author: 'ARC 工作室', rating: 4 },
    { id: 3, name: '小學二校區', category: '教育背景', desc: '校園', price: 800, img: 'https://via.placeholder.com/320x160?text=校園', author: '日型工作室', rating: 5 },
    { id: 4, name: '奧迪A6 2020', category: '車輛', desc: '汽車', price: 55, img: 'https://via.placeholder.com/320x160?text=汽車', author: '日型工作室', rating: 4 },
  ];

  // 分類與搜尋過濾
  const filtered = products.filter(p =>
    (category === '全部' || p.category === category) &&
    (search === '' || p.name.includes(search) || p.desc.includes(search))
  );

  return (
    <div className="product-grid">
      {filtered.length > 0 ? (
        filtered.map(p => (
          <div key={p.id} className="product-card">
            <img className="product-img" src={p.img} alt={p.name} />
            <div className="product-label">{p.category}</div>
            <div className="product-name">{p.name}</div>
            <div className="product-desc">{p.desc}</div>
            <div className="product-price">雷亞幣 {p.price}</div>
            <div className="product-meta">
              <span className="product-author">{p.author}</span>
              <span className="product-rating">{'★'.repeat(p.rating)}</span>
            </div>
            <button className="product-cart-btn">加入購物車</button>
          </div>
        ))
      ) : (
        <div className="product-empty">無符合商品</div>
      )}
    </div>
  );
}

export default ProductList;
