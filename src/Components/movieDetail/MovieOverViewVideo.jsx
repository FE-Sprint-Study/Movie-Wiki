import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

function MovieOverViewVideo({ postURL, movieData, videoData }) {
  const [videoPath, setVideoPath] = useState(null);

  useEffect(() => {
    if (videoData.results.length) {
      const youtubeVideo = videoData.results.find(
        video => video.site === 'YouTube',
      );
      setVideoPath(youtubeVideo);
    }
  }, []);

  return (
    <>
      <div className="my-10 border-[0.3px] border-slate-600" />
      <MovieInfoWrapper>
        <MoviePoster src={postURL} alt="moviePoster" />
        <OverviewWrapper>
          <OverviewDiv>
            <p className="mb-1 break-keep text-sm lg:text-base">
              {movieData.overview}
            </p>
            <ul>
              {movieData.genres.map(genre => (
                <MovieGenres key={genre.id}>{genre.name}</MovieGenres>
              ))}
            </ul>
          </OverviewDiv>
          {videoPath && (
            <iframe
              width="240rem"
              height="160rem"
              src={`https://www.${videoPath.site}.com/embed/${videoPath.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
              className="hidden self-center md:block"
            />
          )}
        </OverviewWrapper>
      </MovieInfoWrapper>
    </>
  );
}

const MoviePoster = tw.img`
w-42 h-72 border-[0.3px] border-slate-600
`;

const MovieGenres = tw.li`
lg: mb-2 mr-[10px] inline-block list-none rounded-[30px]
border border-white px-[10px] py-[5px] text-xs lg:px-[20px]
`;

const MovieInfoWrapper = tw.div`
flex h-fit w-fit gap-5 text-white
`;

const OverviewWrapper = tw.div`
relative flex h-80 w-full justify-between gap-5
`;

const OverviewDiv = tw.div`
flex h-72 flex-col justify-between
`;

export default MovieOverViewVideo;
