import React from 'react';
import MovieCard from '../MovieCard';

function SearchResult({ data, keyword }) {
  return (
    <section>
      <div className="mb-5 text-3xl font-bold text-white">
        {keyword}로 검색한 결과
      </div>
      <section className="flex flex-wrap justify-start">
        {data.map(searchMovie => (
          <MovieCard movie={searchMovie} key={searchMovie.id} />
        ))}
      </section>
    </section>
  );
}

export default SearchResult;
