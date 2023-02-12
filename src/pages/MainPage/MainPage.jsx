import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBikes } from '../../redux/slices/bikesSlice';
import { setFilters } from '../../redux/slices/filterSlice';
import Bikes from '../../components/Bikes';
import Categories from '../../components/Categories';
import Sort from '../../components/Sort';
import useBikesService from '../../services/BikesService';
import { baseUrl, sortTypes, categoriesList } from '../../utills/constants';
import Pagination from '../../components/Pagination';
import styles from './MainPage.module.scss';
import { parseQuery, stringifyQuery } from '../../utills/utills';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const { getAllBikes, isLoading } = useBikesService(baseUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId, sortTypeId, searchValue, currentPage } = useSelector((state) => state.filter);
  const categoryTitle = categoriesList[categoryId];
  const isFirstRender = useRef(true);
  const allowSearch = useRef(true);

  const queryParams = useMemo(() => {
    const { sortBy, order } = sortTypes[sortTypeId];
    return {
      category: categoryId,
      sortBy,
      order,
      searchValue,
      page: currentPage,
      limit: 6,
    };
  }, [categoryId, sortTypeId, searchValue, currentPage]);

  // не записываем параметры в адресную строку при первом рендере
  useEffect(() => {
    if (!isFirstRender.current) {
      const queryString = stringifyQuery(queryParams);
      navigate(queryString);
    }
    isFirstRender.current = false;
  }, [queryParams]);

  // проверяем при первом рендере url-параметры
  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const params = parseQuery(queryString);
      const sortTypeId = sortTypes.findIndex(({ sortBy, order }) => {
        return sortBy === params.sortBy && order === params.order;
      });
      dispatch(
        setFilters({
          ...params,
          sortTypeId: sortTypeId === -1 ? 0 : sortTypeId,
          searchValue: searchValue || '',
        }),
      );
      // отменяем первый запрос на сервер, т.к. запрос нужно будет сделать на обновленнные параметры из Redux
      allowSearch.current = false;
    }
  }, []);

  useEffect(() => {
    const onBikesLoading = () => {
      getAllBikes(queryParams).then((res) => {
        dispatch(setBikes(res));
      });
    };
    if (allowSearch.current) {
      onBikesLoading();
    } else {
      allowSearch.current = true;
    }
  }, [queryParams]);

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
