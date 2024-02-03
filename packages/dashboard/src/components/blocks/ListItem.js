import PropTypes from 'prop-types';
import React from 'react';
import Text from '../Text';

export default function ListItem({ children, ...props }) {
  return (
    <Text
      as="li"
      opacity={70}
      className="relative"
      style={{ left: `${(props.element.indent * 20 + 20) || 20}px` }}
    >{children}
    </Text>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  element: PropTypes.shape({
    indent: PropTypes.number,
  }),
};
