import React from 'react';
import tw from 'tailwind-styled-components';

import { AiOutlineSearch } from 'react-icons/ai';

function SearchInput({ Handlerinput, Handlersearch }) {
  return (
    <section className="fixed relative w-400 pt-5">
      <InputBox
        placeholder="검색어를 입력해주세요."
        onChange={e => Handlerinput(e)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            Handlersearch();
          }
        }}
      />
      <AiOutlineSearch
        className="absolute right-4 top-7 cursor-pointer"
        color="black"
        size="40"
        onClick={Handlersearch}
      />
    </section>
  );
}

export default SearchInput;

const InputBox = tw.input`
  mb-32
  h-14
  w-400
  rounded-full
  pl-5
`;
