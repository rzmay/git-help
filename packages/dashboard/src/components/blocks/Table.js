import PropTypes from 'prop-types';
import React from 'react';

export default function Table({ attributes, children }) {
  return <table className="table-fixed w-full" {...attributes}>{children}</table>;
}

Table.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
};
