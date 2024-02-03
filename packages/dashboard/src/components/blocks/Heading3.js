import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';

export default function Heading3({ attributes, children, element }) {
  return (
    <div {...attributes} className="pt-4 pb-1">
      <Text
        as="h3"
        size="xl"
        opacity={70}
        weight="semibold"
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

Heading3.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  element: PropTypes.shape({
    align: PropTypes.string,
  }),
};
