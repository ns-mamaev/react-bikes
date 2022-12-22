import React from 'react';
import BikeCard from './BikeCard';

function Bikes({ list }) {
  return (
    <section>
      <ul className="bikes__grid">
        {list.map((bike) => (
          <BikeCard key={bike.id} {...bike} />
        ))}
      </ul>
    </section>
  );
}

export default Bikes;
