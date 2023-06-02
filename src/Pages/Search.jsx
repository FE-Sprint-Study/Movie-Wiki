import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';

import SearchInput from '../Components/search/SearchInput';
import SearchResult from '../Components/search/SearchResult';
import SearchSimilar from '../Components/search/SearchSimilar';
import TopButton from '../Components/TopButton';
import { searchMovieData } from '../API/movie';
import { API_KEY } from '../Assets/ConstantValue';

function Search() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const Handlerinput = e => {
    setInput(e.target.value);
  };

  const Handlersearch = () => {
    if (input === keyword) return;
    setKeyword(input);
    setData([]);
    setPage(1);
  };

  useEffect(() => {
    if (!keyword) {
      setData([]);
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    searchMovieData(API_KEY, keyword)
      .then(res => res.json())
      .then(json => {
        if (!json.results.length) {
          setData(json.results);
          setIsLoading(false);
          return;
        }
        setData(json.results);
        setIsLoading(false);
        setGenre(json.results[0].genre_ids[0]);
      });
  }, [keyword]);

  return (
    <SearchMain id="search">
      <SearchInput Handlerinput={Handlerinput} Handlersearch={Handlersearch} />
      <TopButton />
      <section className="max-w-[900px]">
        {!data.length ? (
          <div className="text-3xl font-bold text-white">
            검색 결과가 없습니다.
          </div>
        ) : (
          <>
            <SearchResult data={data} keyword={keyword} />
            <SearchSimilar
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              genre={genre}
            />
          </>
        )}
      </section>
    </SearchMain>
  );
}

export default Search;

const SearchMain = tw.section`
  flex 
  flex-col 
  justify-start 
  items-center
  w-full 
  h-screen 
  pl-56
`;
