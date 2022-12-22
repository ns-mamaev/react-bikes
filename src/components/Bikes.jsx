import React from 'react';
import BikeCard from './BikeCard';
import BikeSkeleton from './BikeSkeleton';

function Bikes({ list, inLoading }) {
  return (
    <section>
      <ul className="bikes__grid">
        {inLoading
          ? [...new Array(3)].map((_, index) => <BikeSkeleton key={index} />)
          : list.map((bike) => <BikeCard key={bike.id} {...bike} />)}
      </ul>
    </section>
  );
}

export default Bikes;
