import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import tw from 'tailwind-styled-components';

function EmptyMovie({ message }) {
  return (
    <EmptyContainer>
      <EmptyMainMessage>
        <FaExclamationCircle
          size="32"
          className="mr-2 items-center justify-center"
        />
        <p className="text-3xl">Movie not found.</p>
      </EmptyMainMessage>
      <p className="text-xl text-gray-300">{message}</p>
    </EmptyContainer>
  );
}

const EmptyContainer = tw.article`
  mt-28
  flex
  w-full
  flex-col
  items-center
`;

const EmptyMainMessage = tw.section`
  flex
  items-center
  justify-around
  text-gray-500
`;

export default EmptyMovie;
