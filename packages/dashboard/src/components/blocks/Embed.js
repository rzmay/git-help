import PropTypes from 'prop-types';
import React from 'react';

export default function Embed({ attributes, element, children }) {
  return (
    <div className="w-full h-[500px] mb-4 p-0" {...attributes}>
      <div className="hidden">{children}</div>
      <iframe
        contentEditable={false}
        src={element.url}
        title="Video player"
        className="w-full h-full relative overflow-hidden resize p-0"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

Embed.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
