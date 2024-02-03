import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

export default function Leaf({ attributes, children, leaf }) {
  return (
    <span
      {...attributes}
      className={clsx({
        underline: leaf.underline,
        italic: leaf.italic,
        'font-bold': leaf.bold,
        'line-through': leaf.strike,
        'bg-gray-200 dark:bg-gray-700 rounded-sm py-0.5 px-1.5 text-sm font-mono text-orange-600': leaf.code,
      })}
      data-command-prompt={leaf.commandPrompt}
    >
      {children}
    </span>
  );
}

Leaf.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  leaf: PropTypes.shape({
    bold: PropTypes.bool,
    code: PropTypes.bool,
    italic: PropTypes.bool,
    underline: PropTypes.bool,
    strike: PropTypes.bool,
    commandPrompt: PropTypes.bool,
  }),
};
