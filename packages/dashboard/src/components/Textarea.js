import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export default function Textarea({
  name, readOnly, invalid, className, resizable, ...props
}) {
  return (
    <textarea
      name={name}
      id={name}
      autoComplete="off"
      spellCheck="false"
      autoCorrect="off"
      readOnly={readOnly}
      className={clsx(
        className,
        { 'rounded-md': !className?.includes('rounded') },
        { 'resize-none': !resizable },
        { 'w-full': !className?.includes('w-') },
        'relative transition focus:!ring focus-within:z-20 focus:!outline-none bg-white dark:bg-gray-900 placeholder-gray-300 dark:placeholder-gray-500 text-gray-800 dark:text-white py-2 px-3 text-sm',
        invalid
          ? '!border-red-500 !ring-red-400 !ring-opacity-40 z-10'
          : '!border-gray-200 dark:!border-gray-700 focus:!border-blue-300 dark:focus:!border-blue-400 !ring-blue-400 !ring-opacity-40',
      )}
      {...props}
    />
  );
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  invalid: PropTypes.bool,
  readOnly: PropTypes.bool,
  resizable: PropTypes.bool,
};

Textarea.defaultProps = {
  readOnly: false,
  invalid: false,
  resizable: false,
};
