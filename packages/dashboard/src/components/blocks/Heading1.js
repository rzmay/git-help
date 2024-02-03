import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';

export default function Heading1({ attributes, children, element }) {
  return (
    <div {...attributes} className="pt-8 pb-1">
      <Text
        as="h1"
        size="3xl"
        opacity={70}
        weight="semibold"
        placeholder="Heading 1"
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

Heading1.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  element: PropTypes.shape({
    align: PropTypes.string,
  }),
};
