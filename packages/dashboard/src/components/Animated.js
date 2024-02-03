import PropTypes from 'prop-types';
import React from 'react';

export default function Animated({ animation, children }) {
  return (
    <div className={`animate__animated animate__${animation}`}>
      {children}
    </div>
  );
}

Animated.propTypes = {
  animation: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
