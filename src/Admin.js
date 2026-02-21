import React, { useState } from 'react';
import './App.css';

function Admin() {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState('products');

  const handleLogin = e => {
    e.preventDefault();
    // Demo: 帳號 admin 密碼 1234
    if (login.username === 'admin' && login.password === '1234') {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-card">
        <h2 className="admin-title">後台管理登入</h2>
        <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          <input name="username" placeholder="管理員帳號" value={login.username} onChange={e=>setLogin({...login,username:e.target.value})} className="admin-input" />
          <input name="password" type="password" placeholder="密碼" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})} className="admin-input" />
          <button className="admin-btn" type="submit">登入</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-tabs">
        <button className={tab==='products' ? 'admin-tab active' : 'admin-tab'} onClick={()=>setTab('products')}>商品管理</button>
        <button className={tab==='announcements' ? 'admin-tab active' : 'admin-tab'} onClick={()=>setTab('announcements')}>公告管理</button>
      </div>
      <div className="admin-content">
        {tab==='products' ? (
          <div>商品管理區（後續可串接 API）</div>
        ) : (
          <div>公告管理區（後續可串接 API）</div>
        )}
      </div>
    </div>
  );
}

export default Admin;
