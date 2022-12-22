import React from 'react';
import BikeCard from './BikeCard';
import BikeSkeleton from './BikeSkeleton';

function Bikes({ list, inLoading, searchText }) {
  const skeletons = inLoading
    ? [...new Array(3)].map((_, index) => <BikeSkeleton key={index} />)
    : null;
  const bikes =
    list.length !== 0
      ? list
          .filter(({ modelName }) => modelName.toLowerCase().includes(searchText.toLowerCase()))
          .map((bike) => <BikeCard key={bike.id} {...bike} />)
      : null;
  const findNothing = !inLoading && list.length === 0 ? <p>Ничего не найдено</p> : null;
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
