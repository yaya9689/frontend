import React, { useEffect, useState } from 'react';
import './App.css';

// 公告展示區，預設首頁頂部橫幅
function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // TODO: 串接後端 API
    // fetch('/api/announcements')
    //   .then(res => res.json())
    //   .then(data => setAnnouncements(data));
    // Demo 假資料
    setAnnouncements([
      { id: 1, title: '商城系統全新上線，歡迎體驗！', pinned: true },
      { id: 2, title: '2/21 例行維護公告', pinned: false },
    ]);
  }, []);

  return (
    <div className="announcement-bar">
      {announcements.length > 0 ? (
        <div className="announcement-list">
          {announcements.filter(a => a.pinned).map(a => (
            <span key={a.id} className="announcement-item announcement-pinned">{a.title}</span>
          ))}
          {announcements.filter(a => !a.pinned).map(a => (
            <span key={a.id} className="announcement-item">{a.title}</span>
          ))}
        </div>
      ) : (
        <span className="announcement-empty">暫無公告</span>
      )}
    </div>
  );
}

export default Announcement;
