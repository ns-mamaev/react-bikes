import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <p>Такой страницы нет :(</p>
      <button onClick={() => navigate(-1)}>Назад</button>
    </>
  );
}

export default NotFoundPage;
