import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export default function Select({
  name,
  value,
  onChange,
  onBlur,
  className,
  invalid,
  placeholder,
  children,
  size,
  disabled,
  ...props
}) {
  return (
    <select
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      id={name}
      autoComplete="off"
      className={clsx(
        className,
        {
          'h-7 text-sm': size === 'xs',
          'h-8 text-sm': size === 'sm',
          'h-9 text-sm': size === 'md',
          'h-11': size === 'lg',
          'h-12': size === 'xl',
        },
        { 'pointer-events-none': disabled },
        { 'rounded-md': !className?.includes('rounded') },
        { 'input-group:rounded-none input-group:first:rounded-l-md input-group:last:rounded-r-md': !className?.includes('rounded') },
        'input-group:-ml-px input-group:first:!ml-0',
        { 'w-full': !className?.includes('w-') },
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        'relative transition focus:!ring focus-within:z-20 bg-white dark:bg-gray-900 placeholder-gray-300 dark:placeholder-gray-500 text-gray-800 dark:text-white py-0 pl-3 pr-8',
        invalid
          ? '!border-red-500 !ring-red-400 !ring-opacity-40 z-10'
          : '!border-gray-200 dark:!border-gray-700 focus:!border-blue-300 dark:focus:!border-blue-400 !ring-blue-400 !ring-opacity-40',
      )}
      placeholder={placeholder}
      {...props}
    >
      {children}
    </select>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  value: PropTypes.string,
};

Select.defaultProps = {
  invalid: false,
  size: 'md',
  disabled: false,
};
