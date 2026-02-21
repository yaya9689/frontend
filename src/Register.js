import React, { useState } from 'react';

function Register({ onRegister }) {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await fetch('https://car-studio-production.up.railway.app/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('註冊成功');
        setForm({ username: '', password: '', email: '' });
        if (onRegister) onRegister();
      } else {
        setStatus('註冊失敗');
      }
    } catch {
      setStatus('註冊失敗');
    }
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        <h2 className="form-title">會員註冊</h2>
        <input name="username" value={form.username} onChange={handleChange} placeholder="帳號" required className="form-input" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="form-input" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="密碼" type="password" required className="form-input" />
        <button type="submit" className="form-btn">註冊</button>
        {status && <p className={status.includes('成功') ? 'form-success' : 'form-error'}>{status}</p>}
      </form>
    </div>
  );
}

export default Register;
