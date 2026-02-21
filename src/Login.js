import React, { useState } from 'react';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await fetch('https://car-studio-production.up.railway.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('登入成功');
        setForm({ username: '', password: '' });
        if (onLogin) onLogin();
      } else {
        setStatus('登入失敗');
      }
    } catch {
      setStatus('登入失敗');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2 className="form-title">會員登入</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="帳號" required className="form-input" />
      <input name="password" value={form.password} onChange={handleChange} placeholder="密碼" type="password" required className="form-input" />
      <button type="submit" className="form-btn">登入</button>
      {status && <p className={status.includes('成功') ? 'form-success' : 'form-error'}>{status}</p>}
    </form>
  );
}

export default Login;
