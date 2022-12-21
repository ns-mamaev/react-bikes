import Bikes from './components/Bikes';
import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <div className="controls">
          <Categories />
          <Sort />
        </div>
        <Bikes />
      </main>
    </div>
  );
}

export default App;
