import { faXmark } from '@fortawesome/pro-regular-svg-icons/faXmark';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSelected, useSlateStatic, useReadOnly } from 'slate-react';
import Button from '../Button';

export default function Video({ attributes, element, children }) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const path = ReactEditor.findPath(editor, element);
  const readOnly = useReadOnly();

  return (
    <div className="w-full h-auto mb-4 p-0" {...attributes}>
      {children}
      <div contentEditable={false} className="relative">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video controls className="w-full focus:outline-none" src={element.url} />
        {!readOnly && (
          <Button
            icon={faXmark}
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className={clsx('block transition duration-200 !absolute top-3 right-3', {
              'opacity-0': !selected,
              'opacity-100': selected,
            })}
          >
            Remove video
          </Button>
        )}
      </div>
    </div>
  );
}

Video.propTypes = {
  attributes: PropTypes.any,
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
