import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

export default function RadioGroup({
  name, value, className, children, ...props
}) {
  return (
    <HeadlessRadioGroup className={className} name={name} value={value} {...props}>
      {children}
    </HeadlessRadioGroup>
  );
}

RadioGroup.Option = function Option({
  name, value, disabled, title, description, className,
}) {
  const { handleChange } = useFormikContext();

  return (
    <HeadlessRadioGroup.Option value={value}>
      {({ checked }) => (
        <div className={clsx(className, 'flex flex-col rounded-md w-full focus:outline-none px-5 py-3', { 'border-2 border-black dark:border-white': checked }, { 'border border-gray-300 dark:border-gray-700': !checked })}>
          <div className={clsx({ 'p-px': !checked })}>
            <label className={clsx('flex-col transition cursor-pointer', { 'opacity-50 pointer-events-none': disabled }, { 'cursor-pointer': !disabled })}>
              <div className="flex items-center">
                <input
                  id={value}
                  name={name}
                  value={value}
                  checked={checked}
                  onChange={handleChange}
                  type="radio"
                  className={clsx(
                    'appearance-none transition rounded-full !bg-gray-50 dark:!bg-gray-900 checked:!bg-black dark:checked:!bg-white cursor-pointer',
                    'border-gray-300 dark:border-gray-700 checked:!border-black dark:checked:!border-white',
                    '!ring-offset-0 !ring-0',
                  )}
                />
                <div className="text-sm font-medium text-black ml-2 dark:text-white">{title}</div>
              </div>
              {description && (
                <div className="mt-1 flex-1 flex items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
                </div>
              )}
            </label>
          </div>
        </div>
      )}
    </HeadlessRadioGroup.Option>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

RadioGroup.Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};
