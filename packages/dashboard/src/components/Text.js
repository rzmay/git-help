import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export default function Text({
  as: Tag,
  capitalize,
  children,
  className,
  editable,
  font,
  italic,
  opacity,
  position,
  size,
  truncate,
  underline,
  uppercase,
  weight,
  ...props
}) {
  return (
    <Tag
      contentEditable={editable}
      suppressContentEditableWarning
      className={clsx(className, 'text-black dark:text-white', {
        truncate,
        italic,
        underline,
        uppercase,
        capitalize,
        'focus:outline-none': editable,
      }, {
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-base': size === 'base',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
        'text-2xl': size === '2xl',
        'text-3xl': size === '3xl',
        'text-4xl': size === '4xl',
        'text-5xl': size === '5xl',
        'text-6xl': size === '6xl',
        'text-7xl': size === '7xl',
        'text-8xl': size === '8xl',
        'text-9xl': size === '9xl',
      }, {
        'font-thin': weight === 'thin',
        'font-extralight': weight === 'extralight',
        'font-light': weight === 'light',
        'font-normal': weight === 'normal',
        'font-medium': weight === 'medium',
        'font-semibold': weight === 'semibold',
        'font-bold': weight === 'bold',
        'font-extrabold': weight === 'extrabold',
        'font-black': weight === 'black',
      }, {
        'font-sans': font === 'sans',
        'font-serif': font === 'serif',
        'font-mono': font === 'mono',
        'font-soehne': font === 'soehne',
      }, {
        '!text-opacity-0': opacity === 0,
        '!text-opacity-10': opacity === 10,
        '!text-opacity-20': opacity === 20,
        '!text-opacity-30': opacity === 30,
        '!text-opacity-40': opacity === 40,
        '!text-opacity-50': opacity === 50,
        '!text-opacity-60': opacity === 60,
        '!text-opacity-70': opacity === 70,
        '!text-opacity-80': opacity === 80,
        '!text-opacity-90': opacity === 90,
        '!text-opacity-100': opacity === 100,
      }, {
        'text-left': position === 'left',
        'text-center': position === 'center',
        'text-right': position === 'right',
      })}
      {...props}
    >
      {children}
    </Tag>
  );
}

Text.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
      PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    ])),
  ]),
  capitalize: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  editable: PropTypes.bool,
  font: PropTypes.string,
  italic: PropTypes.bool,
  opacity: PropTypes.oneOf([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]),
  position: PropTypes.oneOf(['left', 'center', 'right']),
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']),
  truncate: PropTypes.bool,
  underline: PropTypes.bool,
  uppercase: PropTypes.bool,
  weight: PropTypes.oneOf(['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']),
};

Text.defaultProps = {
  as: 'div',
  capitalize: false,
  italic: false,
  truncate: false,
  underline: false,
  uppercase: false,
};
