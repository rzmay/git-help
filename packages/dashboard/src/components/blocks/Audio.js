import PropTypes from 'prop-types';
import React from 'react';

export default function Audio({ attributes, element, children }) {
  return (
    <div {...attributes}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio contentEditable={false} src={element.url} controls />
    </div>
  );
}

Audio.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
