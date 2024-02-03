import { faUser } from '@fortawesome/pro-regular-svg-icons/faUser';
import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';

export default function Avatar({
  border, icon, src, size, square, shadow, fit,
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={clsx(
        'inline-block shrink-0 leading-none overflow-hidden',
        square ? 'rounded' : 'rounded-full',
        { border: border || !src, 'shadow-md': shadow },
      )}
    >
      {src ? (
        <Image
          alt=""
          src={src}
          width={size}
          height={size}
          objectFit={fit}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-black dark:text-white !text-opacity-30"
          style={{ fontSize: size / 3 }}
        >
          <Icon icon={icon || faUser} />
        </div>
      )}
    </div>
  );
}

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  border: PropTypes.bool,
  icon: PropTypes.any,
  shadow: PropTypes.bool,
  square: PropTypes.bool,
  src: PropTypes.string,
  fit: PropTypes.string,
};

Avatar.defaultProps = {
  border: false,
  shadow: false,
  square: false,
};
