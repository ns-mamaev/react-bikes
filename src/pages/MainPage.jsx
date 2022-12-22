import React from 'react';
import Bikes from '../components/Bikes';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { sortTypes } from '../utills/constants';
import { categoriesList } from '../utills/constants';

function MainPage() {
  const [inLoading, setInLoading] = React.useState(false);
  const [bikesList, setBikesList] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState(0);
  const sortNames = sortTypes.map(({ title }) => title);
  const selectedName = sortTypes[selectedType].title;

  const onTypeSelect = (index) => {
    setSelectedType(index);
  };

  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const selectedCategoryName = categoriesList[selectedCategory];
  const onSelectCategory = (index) => {
    setSelectedCategory(index);
  };

  const fetchData = async () => {
    setInLoading(true);
    setBikesList([]);
    try {
      const { type, order } = sortTypes[selectedType];
      const res = await fetch(
        `https://63a2225aa543280f7769c71a.mockapi.io/bikes?sortBy=${type}&order=${order}&category=${selectedCategory}`,
      );
      const json = await res.json();
      setBikesList(json);
    } catch (err) {
      console.log(err);
    } finally {
      setInLoading(false);
    }
  };

  // разделим эффект, будем дергать апи при изменении сортировки, только если массив содержит более 1 элемента
  React.useEffect(() => {
    if (bikesList.length > 1) {
      fetchData();
      console.log('сортировка');
    }
  }, [selectedType]);

  React.useEffect(() => {
    fetchData();
    console.log('категория');
  }, [selectedCategory]);

  return (
    <main className="content">
      <div className="controls">
        <Categories
          list={categoriesList}
          selected={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
        <Sort
          list={sortNames}
          selected={selectedType}
          selectedName={selectedName}
          onTypeSelect={onTypeSelect}
        />
      </div>
      <h2 className="bikes__title">{selectedCategoryName}</h2>
      <Bikes list={bikesList} inLoading={inLoading} />
    </main>
  );
}

export default MainPage;
