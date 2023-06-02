import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

function Tag({ genre, tagList, setTagList }) {
  const [isToggle, setIsToggle] = useState(false);

  const handleTagToggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    if (isToggle) {
      setTagList([...tagList, genre]);
      return;
    }
    setTagList([...tagList.filter(e => e.name !== genre.name)]);
  }, [isToggle]);

  return (
    <StyledTag
      role="checkbox"
      className={`${isToggle ? 'border-blueWhite bg-blueWhite' : ''}`}
      onClick={handleTagToggle}
      tabIndex={0}
    >
      {genre.name}
    </StyledTag>
  );
}

const StyledTag = tw.button`
  m-2
  flex
  w-20
  justify-center
  rounded-2xl
  border-2
  border-black
  border-white
  py-1
  text-sm
  text-white
  select-none
`;

export default Tag;
