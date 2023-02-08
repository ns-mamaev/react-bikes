import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBikes } from '../../redux/slices/bikesSlice';
import Bikes from '../../components/Bikes';
import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import useBikesService from '../../services/BikesService';
import { baseUrl, sortTypes, categoriesList } from '../../utills/constants';
import Pagination from '../../components/Pagination';
import styles from './MainPage.module.scss';

function MainPage() {
  const { getAllBikes, isLoading } = useBikesService(baseUrl);
  const dispatch = useDispatch();
  const { categoryId, sortTypeId, searchValue, currentPage } = useSelector((state) => state.filter);
  const { sortBy, order } = sortTypes[sortTypeId];
  const categoryTitle = categoriesList[categoryId];

  const onBikesLoading = () => {
    getAllBikes({
      category: categoryId,
      sortBy,
      order,
      searchValue,
      page: currentPage + 1,
      limit: 6,
    }).then((res) => {
      dispatch(setBikes(res));
    });
  };

  useEffect(onBikesLoading, [categoryId, sortTypeId, searchValue, currentPage]);

  return (
    <main className='content'>
      <div className='controls'>
        <Categories />
        <Sort />
      </div>
      <h2 className={styles.title}>{categoryTitle}</h2>
      <Bikes isLoading={isLoading} />
      <Pagination />
    </main>
  );
}

export default MainPage;
