import { useDispatch, useSelector } from 'react-redux';
import { categoriesList } from '../utills/constants';
import { setCategory } from '../redux/slices/filterSlice';

function Categories() {
  const selected = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const onSelectCategory = (i) => {
    dispatch(setCategory(i));
  };

  return (
    <ul className="categories">
      {categoriesList.map((cat, i) => (
        <li
          className={`categories__item ${selected === i ? 'categories__item_active' : ''}`}
          onClick={() => onSelectCategory(i)}
          key={cat}>
          {cat}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
