import { faCheck } from '@fortawesome/pro-regular-svg-icons/faCheck';
import { faClipboard } from '@fortawesome/pro-regular-svg-icons/faClipboard';
import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';
import Icon from './Icon';

export default function CopyButton({ children, value, ...props }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <Button
      {...props}
      onClick={(e) => {
        e.preventDefault();
        copy(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      }}
    >
      <Icon icon={copied ? faCheck : faClipboard} className={clsx({ 'mr-2': !!children })} fixedWidth />
      {children}
    </Button>
  );
}

CopyButton.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
};
