import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { ChromePicker } from 'react-color';
import { usePopper } from 'react-popper';
import Input from './Input';
import Text from './Text';

export default function ColorInput({ className, value, onChange }) {
  const [referenceElement, setReferenceElement] = React.useState();
  const [popperElement, setPopperElement] = React.useState();
  const [color, setColor] = React.useState(value || '#000000');
  const [inputValue, setInputValue] = React.useState(color.substring(1));
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'flip',
        options: {
          boundary: [],
          padding: { bottom: 150 },
          allowedAutoPlacements: ['top', 'bottom'],
        },
      },
    ],
  });

  React.useEffect(() => {
    if (value && color !== value) setColor(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  React.useEffect(() => {
    if (onChange) onChange(color);
    setInputValue(color.substring(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <div className={clsx(className, 'group flex items-center relative w-full')}>
      <Input
        name="color"
        value={inputValue}
        maxLength={6}
        placeholder="FFFFFF"
        className="indent-12 font-mono w-32"
        onChange={(e) => {
          const { value } = e.target;
          setColor(`#${value}`);
          setInputValue(value);
        }}
      />
      <div className="absolute z-20 top-px bottom-0 left-9 pl-3 flex items-center pointer-events-none">
        <Text as="span" opacity={30}>#</Text>
      </div>
      <Popover className="absolute left-px inset-y-px">
        <Popover.Button
          className="appearance-none focus:outline-none absolute rounded-l border-r h-full w-9 z-20"
          style={{ backgroundColor: color }}
          ref={setReferenceElement}
        />
        <Popover.Panel
          className="z-50"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <ChromePicker
            color={color}
            disableAlpha
            onChange={(c) => setColor(c.hex)}
          />
        </Popover.Panel>
      </Popover>
    </div>
  );
}

ColorInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
