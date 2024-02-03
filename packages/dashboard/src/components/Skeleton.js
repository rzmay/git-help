import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const Skeleton = function Skeleton({
  height,
  rounded = false,
  squared = false,
  width,
  ...props
}) {
  return (
    <span
      className={clsx('h-full bg-gray-400 opacity-20 inline-block w-full', {
        'rounded-full': rounded,
        'rounded-none': squared,
        rounded: !rounded && !squared,
      })}
      style={{
        backgroundSize: '200px 100%',
        lineHeight: 1,
        width,
        height,
      }}
      {...props}
    >
      &zwnj;
    </span>
  );
};

Skeleton.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  rounded: PropTypes.bool,
  squared: PropTypes.bool,
};

export default Skeleton;
