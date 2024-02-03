import PropTypes from 'prop-types';
import React from 'react';

export default function TableCell({ attributes, children }) {
  return <td className="border border-gray-300 p-2" {...attributes}>{children}</td>;
}

TableCell.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
};
