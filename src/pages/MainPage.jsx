import React from 'react';
import Bikes from '../components/Bikes';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { sortTypes } from '../utills/constants';

function MainPage() {
  const [bikesList, setBikesList] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState(0);
  const sortNames = sortTypes.map(({ title }) => title);
  const selectedName = sortTypes[selectedType].title;

  const onTypeSelect = (index) => {
    setSelectedType(index);
  };

  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const onSelectCategory = (index) => {
    setSelectedCategory(index);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { type, order } = sortTypes[selectedType];
        const res = await fetch(
          `https://63a2225aa543280f7769c71a.mockapi.io/bikes?sortBy=${type}&order=${order}&category=${selectedCategory}`,
        );
        const json = await res.json();
        setBikesList(json);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [selectedType, selectedCategory]);

  return (
    <main className="content">
      <div className="controls">
        <Categories selected={selectedCategory} onSelectCategory={onSelectCategory} />
        <Sort list={sortNames} selected={selectedName} onTypeSelect={onTypeSelect} />
      </div>
      <Bikes list={bikesList} />
    </main>
  );
}

export default MainPage;
