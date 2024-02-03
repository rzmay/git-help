import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Link from './Link';

export default function Tabs({ className, ...props }) {
  return <nav className={clsx(className, 'max-w-full overflow-auto flex space-x-5')} {...props} />;
}

Tabs.Item = function ({
  className, children, active, href, ...props
}) {
  const Tag = href ? Link : 'div';

  return (
    <Tag
      href={href}
      {...props}
      className={clsx(
        className,
        'pb-1.5 text-sm whitespace-nowrap transition duration-100 cursor-pointer text-black dark:text-white',
        active ? 'border-b-2 border-black dark:border-white' : '!text-opacity-50 hover:!text-opacity-100',
      )}
    >
      {children}
    </Tag>
  );
};

Tabs.Item.displayName = 'Tabs.Item';

Tabs.propTypes = {
  className: PropTypes.string,
};

Tabs.Item.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
};

Tabs.Item.defaultProps = {
  active: false,
};
