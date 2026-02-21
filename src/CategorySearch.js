import React, { useState } from 'react';
import './App.css';

const categories = [
  '全部', '車輛', '軍事', '航空', '海事', '零售', '教育背景', '技術', '醫療保健', '工業', '都市', '住宅'
];

function CategorySearch({ onCategoryChange, onSearch }) {
  const [selected, setSelected] = useState('全部');
  const [search, setSearch] = useState('');

  const handleCategory = (cat) => {
    setSelected(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="category-search-bar">
      <div className="category-btn-group">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn${selected === cat ? ' active' : ''}`}
            onClick={() => handleCategory(cat)}
          >{cat}</button>
        ))}
      </div>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="搜尋商品..."
          value={search}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

export default CategorySearch;
