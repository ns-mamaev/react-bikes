import useFetch from '../hooks/fetch.hooks';

const useBikesService = (baseUrl) => {
  const { request, isLoading, error } = useFetch();

  const getAllBikes = async ({ category = 0, sortBy, order = 'asc', searchValue }) => {
    const categoryQuery = category ? `&category=${category}` : '';
    const sortQuery = `sortBy=${sortBy}&order=${order}`;
    const searchQuery = searchValue ? `&modelName=${searchValue}` : '';
    const url = baseUrl + '?' + sortQuery + categoryQuery + searchQuery;

    return await request(url);
  };

  return {
    isLoading,
    error,
    getAllBikes,
  };
};

export default useBikesService;
