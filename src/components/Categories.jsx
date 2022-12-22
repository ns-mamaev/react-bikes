import { categoriesList } from '../utills/constants';

function Categories({ selected, onSelectCategory }) {
  return (
    <ul className="categories">
      {categoriesList.map((cat, i) => (
        <li
          className={`categories__item ${selected === i ? 'categories__item_active' : ''}`}
          onClick={() => onSelectCategory(i)}
          key={i}>
          {cat}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
