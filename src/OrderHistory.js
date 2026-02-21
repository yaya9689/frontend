import React, { useEffect, useState } from 'react';
import './App.css';

// 訂單紀錄區（會員資料頁內嵌）
function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: 串接後端 API
    // fetch(`/api/orders?userId=${userId}`)
    //   .then(res => res.json())
    //   .then(data => setOrders(data));
    // Demo 假資料
    setOrders([
      { id: 101, date: '2026-02-21', status: '已完成', items: '雷亞斯49', total: 49 },
      { id: 102, date: '2026-02-20', status: '已付款', items: '奧迪A6 2020', total: 55 },
    ]);
  }, [userId]);

  return (
    <div className="order-history-card">
      <div className="order-history-title">訂單紀錄</div>
      {orders.length > 0 ? (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>日期</th>
              <th>商品</th>
              <th>總金額</th>
              <th>狀態</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>R$ {order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="order-history-empty">暫無訂單紀錄</div>
      )}
    </div>
  );
}

export default OrderHistory;
