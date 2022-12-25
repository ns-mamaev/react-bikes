import useFetch from '../hooks/fetch.hooks';

const useBikesService = (baseUrl) => {
  const { request, isLoading, error } = useFetch();

  const getAllBikes = async ({ category = 0, sortBy, order = 'asc' }) => {
    const categoryQuery = category ? `&category=${category}` : '';
    const sortQuery = `sortBy=${sortBy}&order=${order}`;
    const url = baseUrl + '?' + sortQuery + categoryQuery;

    return await request(url);
  };

  return {
    isLoading,
    error,
    getAllBikes,
  };
};

export default useBikesService;
