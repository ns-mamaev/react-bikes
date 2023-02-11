import React from 'react';
import BikeCard from './BikeCard';
import BikeSkeleton from './BikeSkeleton';
import { useSelector } from 'react-redux';

function Bikes({ isLoading }) {
  const bikesList = useSelector((state) => state.bikes.list);
  const cart = useSelector((state) => state.cart.items);

  const createBikeCard = (bike) => {
    const addedToCart = cart.filter(({ id }) => {
      return bike.id === id;
    });

    return <BikeCard key={bike.id} addedToCart={addedToCart} {...bike} />;
  };

  const skeletons = isLoading
    ? [...new Array(6)].map((_, index) => <BikeSkeleton key={index} />)
    : null;
  const bikes = bikesList.length !== 0 && !isLoading ? bikesList.map(createBikeCard) : null;
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
