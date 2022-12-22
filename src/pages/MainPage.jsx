import Bikes from '../components/Bikes';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

function MainPage() {
  return (
    <main className="content">
      <div className="controls">
        <Categories />
        <Sort />
      </div>
      <Bikes />
    </main>
  );
}

export default MainPage;
