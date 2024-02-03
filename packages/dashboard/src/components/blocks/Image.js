import { faXmark } from '@fortawesome/pro-regular-svg-icons/faXmark';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic, ReactEditor, useReadOnly } from 'slate-react';
import Button from '../Button';

export default function Image({ attributes, element, children }) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const path = ReactEditor.findPath(editor, element);
  const readOnly = useReadOnly();

  return (
    <div {...attributes} className="py-1">
      {children}
      <div contentEditable={false} className="relative">
        <img src={element.url} className="block" alt="Guide" />
        {!readOnly && (
          <Button
            icon={faXmark}
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className={clsx('block transition duration-200 !absolute top-3 right-3', {
              'opacity-0': !selected,
              'opacity-100': selected,
            })}
          >
            Remove image
          </Button>
        )}
      </div>
    </div>
  );
}

Image.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
