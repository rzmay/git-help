import PropTypes from 'prop-types';
import React from 'react';

export default function Divider({ attributes, children }) {
  return (
    <div {...attributes} contentEditable={false} className="h-8 flex flex-col justify-center">
      {children}
      <hr className="border-gray-200 dark:border-gray-600" />
    </div>
  );
}

Divider.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
};
