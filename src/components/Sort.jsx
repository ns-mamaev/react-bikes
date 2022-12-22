import React from 'react';

function Sort({ list, selected, onTypeSelect }) {
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
          {selected}
        </span>
      </div>
      {popupOpened && (
        <ul className="sort__popup">
          {list.map((title, i) => (
            <li key={title} className="sort__type-item" onClick={() => onTypeClick(i)}>
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sort;
