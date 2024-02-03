import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

export default function Background({ image, className, ...props }) {
  return (
    <Image
      {...props}
      layout="fill"
      quality={100}
      objectFit="cover"
      objectPosition="center"
      className={clsx('absolute inset-0 overflow-hidden select-none pointer-events-none z-0', className)}
      src={image}
    />
  );
}

Background.propTypes = {
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
};
