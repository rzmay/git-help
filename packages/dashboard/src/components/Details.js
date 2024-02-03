import { faArrowRight } from '@fortawesome/pro-regular-svg-icons/faArrowRight';
import clsx from 'clsx';
import isAbsoluteUrl from 'is-absolute-url';
import PropTypes from 'prop-types';
import React from 'react';
import Link from './Link';
import Skeleton from './Skeleton';
import Text from './Text';

export default function Details({ children, className, ...props }) {
  return (
    <div className={clsx(className, 'space-y-1.5')} {...props}>
      {children}
    </div>
  );
}

Details.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Details.Item = function ({
  loading,
  href,
  label,
  placeholder,
  value,
  ...props
}) {
  return (
    <div className="grid grid-cols-3" {...props}>
      <Text size="sm" opacity={50}>{label}</Text>
      {loading ? <Skeleton width={120} /> : (
        <Text size="sm" opacity={value ? 70 : 30} className="col-span-2 break-words whitespace-pre-wrap">
          {!value ? (placeholder || `No ${label.toLowerCase()}`) : (!href ? value : (
            <Link
              href={href}
              underline
              external={isAbsoluteUrl(href)}
              icon={href.startsWith('/') ? faArrowRight : undefined}
            >
              {value}
            </Link>
          ))}
        </Text>
      )}
    </div>
  );
};

Details.Item.displayName = 'Details.Item';

Details.Item.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  href: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};
