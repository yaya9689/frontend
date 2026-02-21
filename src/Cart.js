import React, { useState } from 'react';

function Cart({ cartItems, onRemove, onCheckout }) {
  const [status, setStatus] = useState('');

  const handleCheckout = () => {
    setStatus('結帳成功！');
    if (onCheckout) onCheckout();
  };

  return (
    <div className="cart-card">
      <h2 className="cart-title">購物車</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">購物車尚無商品</div>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>雷亞幣 {item.price}</span>
                <button className="cart-remove-btn" onClick={()=>onRemove(item.id)}>移除</button>
              </li>
            ))}
          </ul>
          <button className="cart-checkout-btn" onClick={handleCheckout}>結帳</button>
        </>
      )}
      {status && <p className="cart-success">{status}</p>}
    </div>
  );
}

export default Cart;
