import PropTypes from 'prop-types';
import React from 'react';

export default function Link({ attributes, element, children }) {
  return (
    <a
      {...attributes}
      href={element.url}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
