import BikeCard from './BikeCard';
import bikes from '../assets/bikes.json';

function Bikes() {
  return (
    <section>
      <h2 className="bikes__title">шоссе</h2>
      <ul className="bikes__grid">
        {bikes.map((bike) => (
          <BikeCard {...bike} />
        ))}
      </ul>
    </section>
  );
}

export default Bikes;
