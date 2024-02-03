import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons/faCheckCircle';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons/faExclamationCircle';
import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useReadOnly, useSlateStatic } from 'slate-react';
import Icon from '../Icon';

export default function Callout({ attributes, element, children }) {
  const editor = useSlateStatic();
  const readOnly = useReadOnly();

  const handleStatusButtonClick = React.useCallback(() => {
    Transforms.setNodes(
      editor,
      { status: (element.status + 1) % 4 },
      { at: ReactEditor.findPath(editor, element) },
    );
  }, [editor, element]);

  return (
    <div {...attributes} className="callout py-1">
      <div className={clsx(
        'border-l-4 rounded bg-gray-100 dark:bg-gray-700 w-full flex items-start px-3 py-3',
        { 'border-blue-500 text-blue-500': element.status === 0 },
        { 'border-green-500 text-green-500': element.status === 1 },
        { 'border-yellow-500 text-yellow-500': element.status === 2 },
        { 'border-red-500 text-red-500': element.status === 3 },
      )}
      >
        <button
          type="button"
          className={clsx('appearance-none w-5 h-5 mr-3', { 'cursor-default': readOnly })}
          contentEditable={false}
          disabled={readOnly}
          onClick={handleStatusButtonClick}
        >
          {element.status === 0 && <Icon icon={faInfoCircle} fixedWidth />}
          {element.status === 1 && <Icon icon={faCheckCircle} fixedWidth />}
          {element.status === 2 && <Icon icon={faExclamationCircle} fixedWidth />}
          {element.status === 3 && <Icon icon={faExclamationTriangle} fixedWidth />}
        </button>
        <div className="w-full break-words pr-10 text-black dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

Callout.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.shape({
    status: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
