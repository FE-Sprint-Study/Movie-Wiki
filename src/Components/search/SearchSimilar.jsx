import React, { useEffect, useState, useRef } from 'react';
import tw from 'tailwind-styled-components';

import MovieCard from '../MovieCard';
import { API_KEY } from '../../Assets/ConstantValue';
import { movieGenreData } from '../../API/movie';

function SearchSimilar({ page, setPage, isLoading, setIsLoading, genre }) {
  const [similar, setSimilar] = useState([]);
  const targetRef = useRef(null);

  const fetchData = () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      movieGenreData(API_KEY, genre, page)
        .then(res => res.json())
        .then(res => {
          setSimilar(prev => prev.concat(res.results));
          setIsLoading(false);
          setPage(prev => prev + 1);
        });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fetchData();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [page]);

  return (
    <section>
      <SimilarTitle>이런 영화는 어떠신가요?</SimilarTitle>
      <section className="flex flex-wrap justify-start">
        {similar &&
          similar.map(similarMovie => (
            <MovieCard movie={similarMovie} key={similarMovie.id} />
          ))}
      </section>
      <div ref={targetRef} />
      {isLoading && <LoadingText>로딩중...</LoadingText>}
    </section>
  );
}

export default SearchSimilar;

const SimilarTitle = tw.div`
  mb-5
  mt-10
  text-3xl
  font-bold
  text-white
`;

const LoadingText = tw.div`
  h-50
  text-center
  text-2xl
  font-bold
  text-white
`;
