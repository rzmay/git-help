import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import Link from './Link';

export default function NavLink({
  children, href, color, className, activeClassName, isActive, ...props
}) {
  const router = useRouter();
  const active = router.asPath === href || router.pathname === href || isActive;

  return (
    <Link
      href={href}
      className={clsx(
        className,
        'focus:outline-none whitespace-nowrap text-black dark:text-white',
        active ? 'text-opacity-80 dark:text-opacity-80' : 'text-opacity-50 dark:text-opacity-50',
        { [`${activeClassName}`]: active },
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

NavLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  color: PropTypes.bool,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

NavLink.defaultProps = {
  color: false,
};
