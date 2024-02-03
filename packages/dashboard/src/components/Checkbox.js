/* eslint-disable react/prop-types */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import Info from './Info';
import Text from './Text';

function CheckboxInput({ name, value, className, ...props }) {
  return (
    <input
      name={name}
      value={value}
      type="checkbox"
      className={clsx(
        className,
        'appearance-none transition rounded !bg-gray-50 dark:!bg-gray-800 checked:!bg-black dark:checked:!bg-white cursor-pointer',
        'border-gray-300 dark:border-gray-600 checked:!border-black dark:checked:!border-white',
        '!ring-offset-0 !ring-0',
      )}
      {...props}
    />
  );
}

export default function Checkbox({
  name, value, className, label, info, ...props
}) {
  if (!label && !info) return <CheckboxInput {...props} />;

  return (
    <label className="flex items-center py-1">
      <CheckboxInput name={name} value={value} {...props} />
      {label && <Text size="sm" opacity={90} className="ml-2 cursor-pointer">{label}</Text>}
      {info && <Info className="ml-1.5">{info}</Info>}
    </label>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
};
