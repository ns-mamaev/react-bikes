import React from 'react';
import BikeCard from './BikeCard';
import BikeSkeleton from './BikeSkeleton';
import { useSelector } from 'react-redux';

function Bikes({ isLoading }) {
  const bikesList = useSelector((state) => state.bikes.list);

  const skeletons = isLoading
    ? [...new Array(3)].map((_, index) => <BikeSkeleton key={index} />)
    : null;
  const bikes =
    bikesList.length !== 0 && !isLoading
      ? bikesList.map((bike) => <BikeCard key={bike.id} {...bike} />)
      : null;
  const findNothing = !isLoading && bikesList.length === 0 ? <p>Ничего не найдено</p> : null;
  return (
    <section>
      <ul className="bikes__grid">
        {skeletons}
        {bikes}
        {findNothing}
      </ul>
    </section>
  );
}

export default Bikes;
