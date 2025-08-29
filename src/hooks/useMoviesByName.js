import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useMoviesByName = (data) => {
  const [searchResults, setSearchResults] = useState([]);

  const clearResults = () => setSearchResults([]);

  const fetchMovieByName = async (name) => {
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(name)}`);
      const movies = await res.json();
      return movies;
    } catch (error) {
      console.error('Error fetching movie by name:', error);
      return null;
    }
  };

  useEffect(() => {
    if (data?.length > 0) {
      data?.[0]?.forEach((categoryObj) => {
        const cleanCategory = categoryObj?.category.replace(/:$/, ''); // colon remove
        const { items } = categoryObj;

        items.forEach(async (movieName) => {
          const result = await fetchMovieByName(movieName);

          if (result?.results?.length > 0) {
            setSearchResults((prev) => {
              const existing = prev.find((c) => c.category === cleanCategory);

              if (existing) {
                return prev.map((c) =>
                  c.category === cleanCategory
                    ? { ...c, items: [...c.items, ...result.results] }
                    : c
                );
              } else {
                return [
                  ...prev,
                  { category: cleanCategory, items: result.results },
                ];
              }
            });
          }
        });
      });
    }
  }, [data]);

  return { searchResults, clearResults };
};

export default useMoviesByName;
