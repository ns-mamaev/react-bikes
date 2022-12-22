import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import MainPage from './pages/MainPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import './scss/app.scss';
import { debounce } from './utills/utills';

function App() {
  const [searchText, setSearchText] = React.useState('');

  const debounced = React.useCallback(
    debounce(() => alert('ввод завершен'), 2000),
    [],
  );

  const onSearch = (value) => {
    setSearchText(value);
    debounced();
  };

  return (
    <div className="wrapper">
      <Header searchText={searchText} onSearch={onSearch} />
      <Routes>
        <Route path="/" element={<MainPage searchText={searchText} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
