import React from 'react';
import BikeCard from './BikeCard';
import BikeSkeleton from './BikeSkeleton';

function Bikes({ list, inLoading }) {
  const skeletons = inLoading
    ? [...new Array(3)].map((_, index) => <BikeSkeleton key={index} />)
    : null;
  const bikes =
    list.length !== 0 ? (
      list.map((bike) => <BikeCard key={bike.id} {...bike} />)
    ) : (
      <p>Ничего не найдено</p>
    );

  return (
    <section>
      <ul className="bikes__grid">
        {skeletons}
        {bikes}
      </ul>
    </section>
  );
}

export default Bikes;
