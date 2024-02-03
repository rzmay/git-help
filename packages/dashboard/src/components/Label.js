import PropTypes from 'prop-types';
import React from 'react';
import Badge from './Badge';
import Text from './Text';

export default function Label({
  children,
  for: htmlFor,
  optional = false,
  ...props
}) {
  return (
    <Text
      as="label"
      size="sm"
      opacity={70}
      className="inline-block mb-1"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
      {optional && <Badge color="gray" className="ml-1.5 -translate-y-px" size="sm">optional</Badge>}
    </Text>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  for: PropTypes.string.isRequired,
  optional: PropTypes.bool,
};
