import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchContext from './contexts/searchContext';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import './scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
