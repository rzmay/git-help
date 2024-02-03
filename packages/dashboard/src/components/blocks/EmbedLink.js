import { faXmark } from '@fortawesome/pro-light-svg-icons/faXmark';
import { faExternalLinkAlt } from '@fortawesome/pro-regular-svg-icons/faExternalLinkAlt';
import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import GuideEditorContext from '../../context/GuideEditorContext';
import Card from '../Card';
import Icon from '../Icon';
import Text from '../Text';

export default function EmbedLink({ element, children }) {
  const { editor } = React.useContext(GuideEditorContext) || {};
  const path = editor && ReactEditor.findPath(editor, element);
  const [content, setContent] = React.useState({});

  React.useEffect(() => {
    if (element) {
      const [json] = element.children;
      setContent(JSON.parse(json.text));
    }
  }, [element]);

  return (
    <Card className="flex my-4 items-center justify-between border-gray-200 dark:border-gray-500 cursor-pointer" contentEditable={false}>
      <button type="button" className={clsx('grid grid-cols-12 grow items-center', { 'gap-2': !!content.backgroundImage })}>
        <div className="hidden">
          {children}
        </div>
        <div className="flex justify-center col-span-2 h-full items-center relative">
          {content.backgroundImage ? (
            <Image src={content.backgroundImage} layout="fill" objectFit="cover" objectPosition="center" className="rounded-l" />
          ) : (
            <Icon icon={faExternalLinkAlt} size="lg" className="text-gray-500" />
          )}
        </div>
        <div className="col-span-10 flex flex-col text-left p-2">
          <Text truncate>{content.title}</Text>
          <Text size="sm" opacity={50} truncate>{content.description}</Text>
          <Text size="xs" opacity={50} truncate className="mt-2">{content.url}</Text>
        </div>
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
          <Icon icon={faXmark} className="text-gray-400" />
        </button>
      )}
    </Card>
  );
}

EmbedLink.propTypes = {
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
    children: PropTypes.node,
  }).isRequired,
  children: PropTypes.node,
};
