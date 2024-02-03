import PropTypes from 'prop-types';
import React from 'react';

export default function TableRow({ attributes, children }) {
  return <tr {...attributes}>{children}</tr>;
}

TableRow.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
};
