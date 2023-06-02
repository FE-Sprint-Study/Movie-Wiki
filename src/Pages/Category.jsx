import React, { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import { API_KEY, GENRE_LIST } from 'Assets/ConstantValue';
import Tag from 'Components/Tag';
import { movieGenreData } from 'API/movie';
import MovieCard from 'Components/MovieCard';
import useFetchMovie from 'Hooks/useFetchMovie';
import useIntersectionObserver from 'Hooks/useIntersectionObserver';
import TopButton from 'Components/TopButton';
import EmptyMovie from 'Components/EmptyMovie';

function Category() {
  const [genreList, setGenreList] = useState([]);
  const [tagName, setTagName] = useState('');
  const [tagList, setTagList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [isEmptyData, setIsEmptyData] = useState(false);
  const target = useRef(null);
  const isFirstRender = useRef(true);
  const { fetchData: fetchMovieData } = useFetchMovie();

  const fetchMovies = async () => {
    fetchMovieData(
      movieGenreData(
        API_KEY,
        tagList.map(e => e.id),
        pageNum,
      ),
      data => {
        if (data.results.length > 0) {
          setIsEmptyData(false);
        }
        if (data.results.length === 0 && genreList.length === 0) {
          setIsEmptyData(true);
          setIsLoading(false);
          return;
        }
        if (pageNum === 1) {
          setGenreList(data.results);
          setIsLoading(false);
          setIsLoadMore(true);
          return;
        }
        if (data.results && data.results.length > 0) {
          const newData = data.results.filter(
            newItem => !genreList.some(oldItem => oldItem.id === newItem.id),
          );
          setGenreList([...genreList, ...newData]);
          setIsLoadMore(true);
          return;
        }

        setIsEnd(true);
      },
    );
  };

  const onIntersection = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }
        if (isLoadMore) {
          setPageNum(prev => prev + 1);
          setIsLoadMore(false);
        }
      }
    });
  };

  const handleTagChange = () => {
    setGenreList([]);
    setTagName(() => {
      return tagList
        .reduce((acc, cur) => `${acc + cur.name},`, '')
        .slice(0, -1);
    });
  };

  const handleInitialValue = () => {
    isFirstRender.current = true;
    setIsEnd(false);
    if (pageNum === 1) {
      fetchMovies();
      return;
    }
    setPageNum(1);
  };

  useEffect(() => {
    handleTagChange();
    handleInitialValue();
  }, [tagList]);

  useEffect(() => {
    setIsLoading(true);
    setIsEnd(false);
    fetchMovies();
  }, [pageNum]);

  const options = {
    threshold: 1.0,
  };

  useIntersectionObserver(onIntersection, options, target);

  return (
    <section id="category" className="ml-56">
      <TopButton />
      <article className="m-5">
        <TagContainer>
          {GENRE_LIST.map(genre => (
            <Tag
              genre={genre}
              tagList={tagList}
              setTagList={setTagList}
              key={genre.id}
            />
          ))}
        </TagContainer>
      </article>
      <p className="mt-10 text-3xl font-bold text-white">
        {tagName || '태그를 클릭해주세요.'}
      </p>
      <section className="flex flex-wrap">
        {genreList && genreList.map(e => <MovieCard movie={e} key={e.id} />)}
        {isEmptyData && <EmptyMovie message="Please change the tag." />}
      </section>
      <div id="nextPage" ref={target} />
      {isLoading && (
        <Loading className={`${isEnd && 'hidden'}`}>로딩중...</Loading>
      )}
    </section>
  );
}

const TagContainer = tw.article`
  flex
  flex-wrap
  justify-start
  border
  border-white
  py-5
  px-10
  rounded-3xl
`;

const Loading = tw.div`
  flex
  h-52
  items-center
  justify-center
  text-3xl
  font-bold
  text-white
`;

export default Category;
