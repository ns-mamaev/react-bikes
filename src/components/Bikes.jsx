import React from 'react';
import BikeCard from './BikeCard';

function Bikes() {
  const [bikesList, setBikesList] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://63a2225aa543280f7769c71a.mockapi.io/bikes');
        const json = await res.json();
        setBikesList(json);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <section>
      <h2 className="bikes__title">шоссе</h2>
      <ul className="bikes__grid">
        {bikesList.map((bike) => (
          <BikeCard key={bike.id} {...bike} />
        ))}
      </ul>
    </section>
  );
}

export default Bikes;
