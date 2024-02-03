import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Text from './Text';

export default function Modal({ children, open, onClose }) {
  const modalRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !modalRef.current?.contains(event.target)) onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [modalRef, onClose, open]);

  return (
    <Transition.Root show={!!open} as={React.Fragment}>
      <Dialog static open={!!open} onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 z-50" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center z-50 p-5 sm:p-10 focus:outline-none overflow-auto">
            <div ref={modalRef} className="max-w-lg w-full rounded-md shadow-lg bg-white dark:bg-gray-800 border">
              {children}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

Modal.Header = function ({ children, ...props }) {
  return (
    <div className="relative py-4 px-5 border-b bg-white dark:bg-gray-800 rounded-t-md" {...props}>
      {children}
    </div>
  );
};

Modal.Title = function ({ children, ...props }) {
  return (
    <Dialog.Title as={Text} size="xl" weight="semibold" {...props}>
      {children}
    </Dialog.Title>
  );
};

Modal.Subtitle = function ({ children, ...props }) {
  return (
    <Dialog.Description as={Text} size="sm" opacity={50} className="mt-1" {...props}>
      {children}
    </Dialog.Description>
  );
};

Modal.Body = function ({ children, ...props }) {
  return (
    <div className="p-5 first:rounded-t-md last:rounded-b-md bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </div>
  );
};

Modal.Actions = function ({ children, ...props }) {
  return (
    <div className="py-4 px-5 rounded-b-md border-t flex justify-end space-x-2 bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

Modal.Header.propTypes = {
  children: PropTypes.node,
};

Modal.Title.propTypes = {
  children: PropTypes.node,
};

Modal.Subtitle.propTypes = {
  children: PropTypes.node,
};

Modal.Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Modal.Actions.propTypes = {
  children: PropTypes.node,
};
