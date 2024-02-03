import PropTypes from 'prop-types';
import React from 'react';

export default function Progress({ value }) {
  return (
    <div
      className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div className="h-full bg-blue-500 transition-width duration-200 rounded-full" style={{ width: `${value}%` }} />
    </div>
  );
}

Progress.propTypes = {
  value: PropTypes.number.isRequired,
};
