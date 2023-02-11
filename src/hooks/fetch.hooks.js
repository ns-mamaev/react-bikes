import React from 'react';

export default function useFetch() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const request = async (
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' },
  ) => {
    setIsLoading(true);

    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
      });
      if (!res.ok) {
        throw new Error(`Ошибка при обращении к ресурсу ${url}: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { request, isLoading, error, clearError };
}
