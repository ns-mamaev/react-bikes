import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBikes } from '../redux/slices/bikesSlice';
import Bikes from '../components/Bikes';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import useBikesService from '../services/BikesService';
import { baseUrl, sortTypes, categoriesList } from '../utills/constants';

function MainPage() {
  const { getAllBikes, isLoading } = useBikesService(baseUrl);
  const dispatch = useDispatch();
  const { categoryId, sortTypeId } = useSelector((state) => state.filter);
  const bikesList = useSelector((state) => state.bikes.list);
  const { sortBy, order } = sortTypes[sortTypeId];
  const categoryTitle = categoriesList[categoryId];

  const onBikesLoading = () => {
    getAllBikes({
      category: categoryId,
      sortBy,
      order,
    }).then((res) => {
      dispatch(setBikes(res));
    });
  };

  useEffect(onBikesLoading, [categoryId]);
  useEffect(() => {
    if (bikesList.length > 1) {
      onBikesLoading();
    }
  }, [sortTypeId]);

  return (
    <main className="content">
      <div className="controls">
        <Categories />
        <Sort />
      </div>
      <h2 className="bikes__title">{categoryTitle}</h2>
      <Bikes isLoading={isLoading} />
    </main>
  );
}

export default MainPage;
