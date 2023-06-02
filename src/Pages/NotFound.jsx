import React from 'react';
import tw from 'tailwind-styled-components';

function NotFound() {
  return <NotFoundText>존재하지 않는 페이지입니다.(404)</NotFoundText>;
}

export default NotFound;

const NotFoundText = tw.div`
  text-3xl
  font-bold
  text-center
  bg-white
  h-[100vh]
  p-[300px]
  ml-[200px]
`;
