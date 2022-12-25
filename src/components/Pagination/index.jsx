import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

function Pagination() {
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  // костыль, т.к. mockApi не отдает данные о кол-ве страниц
  const pagesCount = 4;

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className={styles.root}>
      <button
        disabled={currentPage === 0}
        onClick={() => onChangePage(currentPage - 1)}
        className={styles.back}
      />
      <ul className={styles.pages}>
        {[...Array(pagesCount)].map((_, i) => (
          <li
            className={currentPage === i ? styles.active : ''}
            key={i}
            onClick={() => onChangePage(i)}>
            {i + 1}
          </li>
        ))}
      </ul>
      <button
        disabled={currentPage === pagesCount - 1}
        onClick={() => onChangePage(currentPage + 1)}
        className={styles.forward}
      />
    </div>
  );
}

export default Pagination;
