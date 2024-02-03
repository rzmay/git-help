import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export default function Toggle({
  checked, onChange, className, label, name,
}) {
  const inputRef = React.useRef(null);

  function handleClick() {
    const checkbox = inputRef.current;
    checkbox.focus();
    checkbox.click();
  }

  return (
    <div className={clsx(className, 'flex')}>
      <button
        type="button"
        aria-pressed={checked}
        onClick={handleClick}
        className="inline-flex focus:outline-none"
      >
        <span className={clsx('relative inline-flex h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none', checked ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700')}>
          <span className={clsx('translate-x-0 relative inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition ease-in-out duration-200', checked ? 'translate-x-4' : 'translate-x-0')} />
        </span>
        {label && <span className="inline-block align-middle text-sm ml-2 text-gray-800 dark:text-gray-200">{label}</span>}
      </button>
      <input
        type="checkbox"
        ref={inputRef}
        id={name}
        className="sr-only"
        onChange={onChange}
        checked={checked}
        name={name}
      />
    </div>
  );
}

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
};
