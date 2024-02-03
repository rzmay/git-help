import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './Icon';
import Text from './Text';

export default function Alert({
  title,
  action,
  icon,
  children,
  variant = 'primary',
  ...props
}) {
  return (
    <div
      className={clsx('p-3 rounded border', {
        'border-pink-300 bg-pink-300 bg-opacity-10': variant === 'primary',
        'border-green-500 bg-green-500 bg-opacity-10': variant === 'success',
        'border-red-500 bg-red-500 bg-opacity-10': variant === 'danger',
        'border-red-400 bg-red-300 bg-opacity-10': variant === 'warning',
      })}
      {...props}
    >
      <div className="flex">
        {icon && (
          <Text opacity={70} className="mr-2">
            <Icon icon={icon} fixedWidth className="block mt-0.5" />
          </Text>
        )}
        <div className="lg:flex flex-1">
          <div className="lg:flex-1">
            <Text size="sm" weight="medium">{title}</Text>
            <Text size="sm" opacity={70} className="max-w-prose mt-0.5">{children}</Text>
          </div>
          <div className="self-center mt-3 lg:mt-0 lg:ml-5">
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'warning']),
  action: PropTypes.node,
  icon: PropTypes.object,
  children: PropTypes.node.isRequired,
};
