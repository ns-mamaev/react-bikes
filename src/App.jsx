import React from 'react';
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import qs from 'qs';
import './scss/app.scss';
import { useDispatch } from 'react-redux';
import {
  setCategory,
  setSortType,
  setSearchValue,
  setCurrentPage,
} from './redux/slices/filterSlice';

function App() {
  const location = useLocation();
  const params = useSearchParams();
  const dispatch = useDispatch();

  console.log(window.location);
  console.log(params);

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
