import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Text from './Text';

export default function Divider({ className, text, ...props }) {
  return (
    <div className={clsx(className, 'flex w-full items-center')} {...props}>
      <div className="grow border-t" aria-hidden="true" />
      {text && (
        <div className="grow-0 mx-3">
          <Text size="sm" opacity={50}>{text}</Text>
        </div>
      )}
      <div className="grow border-t" aria-hidden="true" />
    </div>
  );
}

Divider.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};
