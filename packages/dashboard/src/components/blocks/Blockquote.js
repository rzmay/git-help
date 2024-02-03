import PropTypes from 'prop-types';
import React from 'react';

export default function Blockquote({ children, attributes }) {
  return (
    <div {...attributes} className="my-1">
      <blockquote className="border-l-4 border-gray-200 dark:border-gray-600 dark:text-gray-300 pl-3">{children}</blockquote>
    </div>
  );
}

Blockquote.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  attributes: PropTypes.any,
};
