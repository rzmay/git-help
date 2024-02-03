import PropTypes from 'prop-types';
import React from 'react';

export default function TableBody({ attributes, children }) {
  return <tbody {...attributes}>{children}</tbody>;
}

TableBody.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
};
