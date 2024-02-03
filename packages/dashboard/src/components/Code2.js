import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Text from './Text';

export default function Code({
  children, className, multiline, numbered, ...props
}) {
  const vscodeStyle = 'bg-gray-800 text-white font-mono text-sm'; // Define VS Code style here

  return multiline ? (
    <div className={clsx(vscodeStyle, 'whitespace-pre p-4', className)} {...props}>
      {children?.split('\n').map((line, n) => (
        <div key={n} className="flex">
          {numbered && <Text as="pre" size="sm" opacity={50} className="select-none flex-none text-gray-400">{`${n + 1}`.padStart(4, ' ')}</Text>}
          <Text as="pre" opacity={80} size="sm" className="ml-3 flex-1">{line}</Text>
        </div>
      ))}
    </div>
  ) : (
    <code className={clsx(vscodeStyle, 'p-2', className)} {...props}>
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
