import React from 'react';

function Categories() {
  const categoriesList = ['шоссе', 'шоссе аэро', 'хардтейлы', 'двухподвесы'];

  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <ul className="categories">
      {categoriesList.map((cat, i) => (
        <li
          className={`categories__item ${activeCategory === i ? 'categories__item_active' : ''}`}
          onClick={() => setActiveCategory(i)}
          key={i}>
          {cat}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
