import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';

export default function Paragraph({ attributes, children, element }) {
  return (
    <div {...attributes} className="py-1">
      <Text
        as="p"
        opacity={70}
        className={clsx({
          'text-left': element.align === 'align-left' || !element.align,
          'text-center': element.align === 'align-center',
          'text-right': element.align === 'align-right',
        })}
      >{children}
      </Text>
    </div>
  );
}

Paragraph.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  element: PropTypes.any,
};
