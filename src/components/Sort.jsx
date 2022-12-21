import React from 'react';

function Sort() {
  const sortTypes = ['названию', 'популярности', 'цене'];
  const [selectedType, setSelectedType] = React.useState(0);
  const [popupOpened, setPopupOpened] = React.useState(false);
  const selected = sortTypes[selectedType];

  const onSelectType = (i) => {
    setSelectedType(i);
    setPopupOpened(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <span className="sort__label-static">Сортировать по:</span>
        <span className="sort__selected-type" onClick={() => setPopupOpened(!popupOpened)}>{selected}</span>
      </div>
      {popupOpened && (
        <ul className="sort__popup">
          {sortTypes.map((type, i) => (
            <li key={type} className="sort__type-item" onClick={() => onSelectType(i)}>{type}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Sort;
