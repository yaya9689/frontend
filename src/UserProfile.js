import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', email: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    // 假資料，實際應從後端取得
    setTimeout(() => {
      setUser({ username: 'testuser', email: 'test@mail.com', level: '一般會員' });
      setForm({ username: 'testuser', email: 'test@mail.com' });
      setLoading(false);
    }, 500);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = e => {
    e.preventDefault();
    setStatus('儲存成功');
    setUser({ ...user, ...form });
    setEditMode(false);
  };

  if (loading) return <div className="user-profile-card">載入中...</div>;

  return (
    <div className="user-profile-card">
      <h2 className="profile-title">會員資料</h2>
      {!editMode ? (
        <>
          <div className="profile-row"><span>帳號：</span>{user.username}</div>
          <div className="profile-row"><span>Email：</span>{user.email}</div>
          <div className="profile-row"><span>等級：</span>{user.level}</div>
          <button className="profile-btn" onClick={()=>setEditMode(true)}>編輯資料</button>
        </>
      ) : (
        <form onSubmit={handleSave} style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <input name="username" value={form.username} onChange={handleChange} className="profile-input" />
          <input name="email" value={form.email} onChange={handleChange} className="profile-input" />
          <div style={{display:'flex',gap:'10px'}}>
            <button className="profile-btn" type="submit">儲存</button>
            <button className="profile-btn" type="button" onClick={()=>setEditMode(false)}>取消</button>
          </div>
        </form>
      )}
      {status && <p className="profile-success">{status}</p>}
    </div>
  );
}

export default UserProfile;
