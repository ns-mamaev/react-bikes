import React from 'react';

function BikeCard({ modelName, images, colors, sizes, price }) {
  const [selectedColor, setSelectedColor] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState(0);

  return (
    <li className="bike-card">
      <h4 className="bike-card__name">{modelName}</h4>
      <img src={images[selectedColor]} alt={modelName} className="bike-card__image" />
      <ul className="bike-card__colors">
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
      <ul className="bike-card__sizes">
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
      <div className="bike-card__bottom">
        <p className="bike-card__price">от {price} $</p>
        <button className="bike-card__cart-button">Добавить</button>
      </div>
    </li>
  );
}

export default BikeCard;
