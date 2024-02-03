import { Popover as HeadlessPopover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import Text from './Text';

export default function Popover({ trigger, className, children }) {
  const [open, setOpen] = React.useState(false);
  const [popperElement, setPopperElement] = React.useState();
  const [referenceElement, setReferenceElement] = React.useState();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  return (
    <HeadlessPopover className={clsx(className, 'relative inline-block')}>
      <HeadlessPopover.Button
        ref={setReferenceElement}
        className="appearance-none focus:outline-none"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {trigger}
      </HeadlessPopover.Button>
      {createPortal(
        <div
          className="z-50"
          style={styles.popper}
          ref={setPopperElement}
          {...attributes.popper}
        >
          <Transition
            show={open}
            className="relative w-0 h-0"
            enter="transition-all duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HeadlessPopover.Panel static className="mb-2 absolute bottom-0 -translate-x-1/2 pointer-events-none outline-none z-50 origin-bottom max-w-sm min-w-max">
              <div className="rounded border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-600 shadow-lg py-2 px-3 max-w-xs">
                <Text size="sm" className="whitespace-pre-wrap" position="left">{children}</Text>
              </div>
              <div className="absolute top-auto left-0 right-0 flex justify-center z-30">
                <svg className="w-[20px] h-[10px] -mt-px">
                  <path className="stroke-current text-gray-200 dark:text-gray-500" fill="none" d="M0 0 L10 8 L20 0" strokeWidth={2} />
                  <path className="fill-current text-white dark:text-gray-600" stroke="none" d="M0 0 L10 8 L20 0" />
                </svg>
              </div>
            </HeadlessPopover.Panel>
          </Transition>
        </div>,
        document.body,
      )}
    </HeadlessPopover>
  );
}

Popover.propTypes = {
  trigger: PropTypes.node.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
