import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Text from './Text';

export default function Code({
  children, className, multiline, numbered, ...props
}) {
  return multiline ? (
    <div className={clsx('whitespace-pre-line p-5', className)} {...props}>
      {children?.split('\n').map((line, n) => (
        <div key={n} className="flex">
          {numbered && <Text as="pre" size="sm" opacity={30} className="select-none flex-none">{n + 1}</Text>}
          <Text as="pre" opacity={70} size="sm" className="ml-3 flex-1">{line}</Text>
        </div>
      ))}
    </div>
  ) : (
    <code className={clsx('text-pink-400 before:content-["`"] after:content-["`"]', className)} {...props}>
      {children}
    </code>
  );
}

Code.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  multiline: PropTypes.bool,
  numbered: PropTypes.bool,
};

Code.defaultProps = {
  multiline: false,
  numbered: false,
};
