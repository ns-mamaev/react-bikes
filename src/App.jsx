import Bikes from './components/Bikes';
import Categories from './components/Categories';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <main className="content">
        <Categories />
        <Bikes />
      </main>
    </div>
  );
}

export default App;
