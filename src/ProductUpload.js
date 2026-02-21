import React, { useState } from 'react';

function ProductUpload({ onUpload }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await fetch('https://car-studio-production.up.railway.app/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          image_url: form.image_url
        })
      });
      if (res.ok) {
        setStatus('商品上架成功');
        setForm({ name: '', description: '', price: '', image_url: '' });
        if (onUpload) onUpload();
      } else {
        setStatus('商品上架失敗');
      }
    } catch {
      setStatus('商品上架失敗');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: 24}}>
      <h2>商品上架</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="商品名稱" required /> <br/>
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="商品描述" required /> <br/>
      <input name="price" value={form.price} onChange={handleChange} placeholder="價格" type="number" step="0.01" required /> <br/>
      <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="圖片網址" /> <br/>
      <button type="submit">上架</button>
      {status && <p style={{color: status.includes('成功') ? 'green' : 'red'}}>{status}</p>}
    </form>
  );
}

export default ProductUpload;
