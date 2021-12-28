import React, { useState } from 'react';
import styled from 'styled-components';

/****************
 * Give a star number
 * Render a star component
 ****************/
export const Stars = ({ number = 0, size = 24 }) => {
  //fix number to make sure its [0 - 5] and an even multiple of 0.5
  number = Math.max(0, Math.min(5, Math.floor(number * 4) / 4));

  return (
    <div>
      {[0, 1, 2, 3, 4].map((x, i) => (
        <Star key={i} amount={Math.min(number - x, 1)} size={size} />
      ))}
    </div>
  );
};

export const StarForm = ({ number = 0, onClick, size = 120 }) => {
  const [stars, setStars] = useState(number);

  let handleMouse = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let num = Math.floor((4 * (x + 2)) / (120 / 5)) / 4;
    console.log(num);
    if (num !== stars) {
      setStars(num);
    }
  };

  return (
    <Container
      onMouseMove={(e) => handleMouse(e)}
      onMouseOut={() => setStars(number)}
      onClick={() => onClick(stars)}
    >
      <Stars number={stars} />
    </Container>
  );
};

const Star = ({ amount = 25, size = 24 }) => (
  <svg version='1.1' viewBox='0.0 0.0 240.0 240.0' width={size} height={size}>
    <Empty d='m16.0 96.0l64.0 -16.0l40.0 -64.0l37.713913 65.32021l66.28609 14.679787l-40.0 48.0l8.0 80.0l-72.0 -32.0l-72.0 32.0l8.0 -80.0z' />
    {amount === 0.25 && (
      <Filled d='m16.0 96.0l64.0 -16.0l0 128.0l-32.0 16.0l8.0 -80.0z' />
    )}
    {amount === 0.5 && (
      <Filled d='m16.0 96.0l64.0 -16.0l40.0 -64.0l0 176.0l-72.0 32.0l8.0 -80.0z' />
    )}
    {amount === 0.75 && (
      <Filled d='m16.0 96.0l64.0 -16.0l40.0 -64.0l40.0 66.0l0 128.0l-40.0 -16.0l-72.0 32.0l8.0 -80.0z' />
    )}
    {amount === 1 && (
      <Filled d='m16.0 96.0l64.0 -16.0l40.0 -64.0l37.713913 65.32021l66.28609 14.679787l-40.0 48.0l8.0 80.0l-72.0 -32.0l-72.0 32.0l8.0 -80.0z' />
    )}
  </svg>
);

const Container = styled.div`
  width: 120px;
  display: inline-block;
  cursor: pointer;
  svg {
    pointer-events: none;
  }
`;

const Empty = styled.path`
  fill: ${(props) => props.theme.bgDark};
`;

const Filled = styled.path`
  fill: ${(props) => props.theme.graph}; ;
`;
