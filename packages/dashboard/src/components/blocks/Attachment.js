import { faPaperclip } from '@fortawesome/pro-light-svg-icons/faPaperclip';
import { faXmark } from '@fortawesome/pro-light-svg-icons/faXmark';
import fileDownload from 'js-file-download';
import PropTypes from 'prop-types';
import React from 'react';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import GuideEditorContext from '../../context/GuideEditorContext';
import { getAttachment } from '../../services/guide.service';
import Card from '../Card';
import Icon from '../Icon';

export default function Attachment({ element, children }) {
  const { editor } = React.useContext(GuideEditorContext) || {};
  const path = editor && ReactEditor.findPath(editor, element);

  const downloadAttachment = React.useCallback(() => {
    getAttachment(element.id)
      .then((data) => fileDownload(data, element.filename));
  }, [element]);

  return (
    <Card contentEditable={false} className="flex my-1 items-center justify-between transition duration-200 ease-in-out !bg-gray-100 dark:!bg-gray-800 hover:!bg-gray-200 dark:hover:!bg-gray-700 text-gray-400 dark:text-gray-300 cursor-pointer border-none">
      <button type="button" onClick={downloadAttachment} className="flex grow p-2 items-center">
        <Icon icon={faPaperclip} className="mr-2" />
        {children}
      </button>
      {editor && (
        <button
          type="button"
          onClick={() => {
            Transforms.removeNodes(editor, { at: path });
            Transforms.insertNodes(editor, [{ type: 'paragraph', children: [{ text: '' }] }]);
          }}
          className="py-2 px-3"
        >
          <Icon icon={faXmark} />
        </button>
      )}
    </Card>
  );
}

Attachment.propTypes = {
  element: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};
