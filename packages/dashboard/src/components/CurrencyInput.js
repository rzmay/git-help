import clsx from 'clsx';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import ReactCurrencyInput from 'react-currency-input-field';
import currencies from '../constants/currencies';

export default function CurrencyInput({
  name,
  className,
  currency,
  onValueChange,
  disabled = false,
  invalid = false,
  size = 'md',
  ...props
}) {
  const currencyData = React.useMemo(() => currencies.find((c) => c.code === currency), [currency]);
  const decimalScale = currencyData?.isCrypto ? 5 : 2;
  const decimalSeparator = currencyData?.decimalSeparator || '.';
  const groupSeparator = decimalSeparator === '.' ? ',' : '.';

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <div className="relative input-group:-ml-px input-group:first:!ml-0 group">
            <ReactCurrencyInput
              id={name}
              onBlur={field.onBlur}
              decimalScale={decimalScale}
              decimalsLimit={decimalScale}
              disabled={disabled}
              autoComplete="off"
              decimalSeparator={decimalSeparator}
              groupSeparator={groupSeparator}
              className={clsx(
                className,
                {
                  'h-7 text-sm': size === 'xs',
                  'h-8 text-sm': size === 'sm',
                  'h-9 text-sm': size === 'md',
                  'h-10': size === 'lg',
                  'h-11': size === 'xl',
                },
                { 'rounded-md': !className?.includes('rounded') },
                { 'input-group:rounded-none input-group:group-first:rounded-l-md input-group:group-last:rounded-r-md': !className?.includes('rounded') },
                { 'input-group:-ml-px input-group:first:!ml-0': !className?.includes('input-group') },
                { 'w-full': !className?.includes('w-') },
                { 'cursor-not-allowed': disabled },
                'relative transition focus:!ring focus-within:z-20 bg-white dark:bg-gray-900 placeholder-gray-300 dark:placeholder-gray-500 text-gray-800 dark:text-white py-0 pl-6 pr-3',
                {
                  '!border-gray-200 dark:!border-gray-700 focus:!border-blue-300 dark:focus:!border-blue-400 !ring-blue-400 !ring-opacity-40': !invalid,
                  '!border-red-500 !ring-red-400 !ring-opacity-40 z-10': invalid,
                },
              )}
              onValueChange={(value) => {
                const formattedValue = decimalSeparator === ','
                  ? value?.replaceAll(/,|\.\s*/g, (match) => (match === '.' ? ',' : '.'))
                  : value;

                const parsedValue = currencyData?.isCrypto
                  ? parseFloat(formattedValue)
                  : Math.round(formattedValue * (currencyData?.isZeroCurrency ? 1 : 100) || 0);

                form.setFieldValue(name, parsedValue);

                if (onValueChange) onValueChange(parsedValue);
              }}
              {...props}
            />
            <div className="absolute top-px z-20 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-800 dark:text-gray-200 text-sm">
                {getSymbolFromCurrency(currency)}
              </span>
            </div>
          </div>
        );
      }}
    </Field>
  );
}

CurrencyInput.propTypes = {
  currency: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
  onValueChange: PropTypes.func,
};
