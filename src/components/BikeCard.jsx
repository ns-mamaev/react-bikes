import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

function BikeCard({ id, modelName, images, colors, sizes, price }) {
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState(0);
  const color = colors[selectedColor];
  const image = images[selectedColor];
  const size = sizes[selectedSize];
  const dispatch = useDispatch();

  const onAddToCard = () => {
    const item = { id, title: modelName, options: { color, size }, image, price };
    dispatch(addItem(item));
  };

  return (
    <li className='bike-card'>
      <h4 className='bike-card__name'>{modelName}</h4>
      <img src={image} alt={modelName} className='bike-card__image' />
      <ul className='bike-card__colors'>
        {colors.map((color, i) => (
          <li
            className={`bike-card__color-circle ${
              selectedColor === i ? 'bike-card__color-circle_active' : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(i)}
            key={i}
          />
        ))}
      </ul>
      <ul className='bike-card__sizes'>
        {sizes.map((size, i) => (
          <li
            className={`bike-card__size-tab ${
              selectedSize === i ? 'bike-card__size-tab_active' : ''
            }`}
            onClick={() => setSelectedSize(i)}
            key={i}>
            {size}
          </li>
        ))}
      </ul>
      <div className='bike-card__bottom'>
        <p className='bike-card__price'>от {price} $</p>
        <button type='button' className='bike-card__cart-button' onClick={onAddToCard}>
          Добавить
        </button>
      </div>
    </li>
  );
}

export default BikeCard;
