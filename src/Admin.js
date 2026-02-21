import React, { useState } from 'react';
import './App.css';

function Admin() {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tab, setTab] = useState('products');

  // 公告管理假資料
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: '商城系統全新上線，歡迎體驗！', pinned: true, category: '系統', status: '啟用' },
    { id: 2, title: '2/21 例行維護公告', pinned: false, category: '維護', status: '啟用' },
  ]);
  const [newAnn, setNewAnn] = useState({ title: '', pinned: false, category: '', status: '啟用' });
  const [editId, setEditId] = useState(null);

  const handleLogin = e => {
    e.preventDefault();
    if (login.username === 'admin' && login.password === '1234') {
      setIsLoggedIn(true);
    }
  };

  const handleAddAnn = e => {
    e.preventDefault();
    setAnnouncements(prev => [...prev, { ...newAnn, id: Date.now() }]);
    setNewAnn({ title: '', pinned: false, category: '', status: '啟用' });
  };
  const handleEditAnn = (id, data) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    setEditId(null);
  };
  const handleDeleteAnn = id => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
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
          <div>
            <h3 style={{color:'#ffcb5b',marginBottom:'12px'}}>公告列表</h3>
            <ul style={{padding:0,listStyle:'none',marginBottom:'24px'}}>
              {announcements.map(a => (
                <li key={a.id} style={{marginBottom:'10px',background:'#181a1b',borderRadius:'8px',padding:'12px 18px',display:'flex',alignItems:'center',gap:'12px'}}>
                  {editId === a.id ? (
                    <>
                      <input value={a.title} onChange={e=>handleEditAnn(a.id,{title:e.target.value})} style={{width:'180px'}} />
                      <select value={a.category} onChange={e=>handleEditAnn(a.id,{category:e.target.value})}>
                        <option value="系統">系統</option>
                        <option value="維護">維護</option>
                        <option value="活動">活動</option>
                      </select>
                      <label><input type="checkbox" checked={a.pinned} onChange={e=>handleEditAnn(a.id,{pinned:e.target.checked})} />置頂</label>
                      <select value={a.status} onChange={e=>handleEditAnn(a.id,{status:e.target.value})}>
                        <option value="啟用">啟用</option>
                        <option value="停用">停用</option>
                      </select>
                      <button className="admin-btn" onClick={()=>setEditId(null)}>完成</button>
                    </>
                  ) : (
                    <>
                      <span style={{fontWeight:'700',color:a.pinned?'#ffd97a':'#f3f3f3'}}>{a.title}</span>
                      <span style={{color:'#ffcb5b'}}>{a.category}</span>
                      <span style={{color:a.pinned?'#ffd97a':'#bdbdbd'}}>{a.pinned?'置頂':''}</span>
                      <span style={{color:a.status==='啟用'?'#2ecc40':'#e74c3c'}}>{a.status}</span>
                      <button className="admin-btn" onClick={()=>setEditId(a.id)}>編輯</button>
                      <button className="admin-btn" onClick={()=>handleDeleteAnn(a.id)}>刪除</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddAnn} style={{display:'flex',gap:'12px',alignItems:'center'}}>
              <input value={newAnn.title} onChange={e=>setNewAnn({...newAnn,title:e.target.value})} placeholder="公告標題" style={{width:'180px'}} />
              <select value={newAnn.category} onChange={e=>setNewAnn({...newAnn,category:e.target.value})}>
                <option value="">分類</option>
                <option value="系統">系統</option>
                <option value="維護">維護</option>
                <option value="活動">活動</option>
              </select>
              <label><input type="checkbox" checked={newAnn.pinned} onChange={e=>setNewAnn({...newAnn,pinned:e.target.checked})} />置頂</label>
              <select value={newAnn.status} onChange={e=>setNewAnn({...newAnn,status:e.target.value})}>
                <option value="啟用">啟用</option>
                <option value="停用">停用</option>
              </select>
              <button className="admin-btn" type="submit">新增公告</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
