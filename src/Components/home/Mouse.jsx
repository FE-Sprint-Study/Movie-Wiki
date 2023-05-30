import React from 'react';
import { styled } from 'styled-components';

function Mouse() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex rotate-180">
        <FirstArrow />
        <SecondArrow />
        <ThirdArrow />
      </div>
      <MouseDiv />
      <div className="flex">
        <FirstArrow />
        <SecondArrow />
        <ThirdArrow />
      </div>
    </div>
  );
}

const Span = styled.span`
  display: block;
  width: 5px;
  height: 5px;
  transform: rotate(-45deg);

  border-right: 2px solid white;
  border-bottom: 2px solid white;

  animation: mouse-scroll 1s infinite;
  animation-direction: alternate;

  @keyframes mouse-scroll {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.8;
    }
  }
`;

const FirstArrow = styled(Span)`
  animation-delay: 0.1s;
`;

const SecondArrow = styled(Span)`
  animation-delay: 0.2s;
`;

const ThirdArrow = styled(Span)`
  animation-delay: 0.3s;
`;

const MouseDiv = styled.div`
  height: 21px;
  width: 14px;
  border-radius: 10px;
  transform: rotate(90deg);
  border: 2px solid rgba(255, 255, 255, 0.5);
  top: 170px;
`;

export default Mouse;
