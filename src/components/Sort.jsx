import React from 'react';

function Sort({ list, selected, selectedName, onTypeSelect }) {
  const [popupOpened, setPopupOpened] = React.useState(false);

  const onTypeClick = (i) => {
    onTypeSelect(i);
    setPopupOpened(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <span className="sort__label-static">Сортировать по:</span>
        <span className="sort__selected-type" onClick={() => setPopupOpened(!popupOpened)}>
          {selectedName}
        </span>
      </div>
      {popupOpened && (
        <ul className="sort__popup">
          {list.map((title, i) => (
            <li
              key={title}
              className={`sort__type-item ${i === selected ? 'sort__type-item_selected' : ''}`}
              onClick={() => onTypeClick(i)}>
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sort;
