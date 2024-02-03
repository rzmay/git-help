import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';

export default function Heading2({ attributes, children, element }) {
  return (
    <div {...attributes} className="pt-6 pb-1">
      <Text
        as="h2"
        size="2xl"
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

Heading2.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  element: PropTypes.shape({
    align: PropTypes.string,
  }),
};
