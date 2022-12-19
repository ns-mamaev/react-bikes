function BikeCard({ modelName, images: [image], colors, sizes, price }) {
  return (
    <li className="bike-card">
      <h4 className="bike-card__name">{modelName}</h4>
      <img src={image} alt={modelName} className="bike-card__image" />
      <ul className="bike-card__colors">
        {colors.map((color) => (
          <li className="bike-card__color-circle" style={{ backgroundColor: color }}></li>
        ))}
      </ul>
      <ul className="bike-card__sizes">
        {sizes.map((size) => (
          <li className="bike-card__size-tab">{size}</li>
        ))}
      </ul>
      <p className="bike-card__price">от {price} $</p>
      <button className="bike-card__button">Добавить</button>
    </li>
  );
}

export default BikeCard;
