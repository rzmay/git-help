import dynamic from 'next/dynamic';
import React from 'react';
import ReactConfetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

function Confetti() {
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      gravity={0.2}
      numberOfPieces={1000}
      recycle={false}
      width={width}
      height={height}
    />
  );
}

export default dynamic(() => Promise.resolve(Confetti), { ssr: false });
