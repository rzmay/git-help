import { faXmark } from '@fortawesome/pro-light-svg-icons/faXmark';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import GuideEditorContext from '../../context/GuideEditorContext';
import highlightCode from '../../helpers/highlightCode';
import Badge from '../Badge';
import Icon from '../Icon';
import Select from '../Select';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-http';

function Element({ attributes, children }) {
  return <p {...attributes} data-slate-code-element="true">{children}</p>;
}

function Leaf({ attributes, children, leaf }) {
  return (
    <span
      {...attributes}
      data-code-block="true"
      className={clsx('monospace', {
        'text-gray-400': leaf.comment,
        'text-red-600 dark:text-red-400': (leaf.operator || leaf.url),
        'text-blue-500 dark:text-blue-300': leaf.keyword,
        'text-yellow-500': leaf.variable || leaf.regex,
        'text-red-500 dark:text-red-300': (leaf.number
          || leaf.boolean
          || leaf.tag
          || leaf.constant
          || leaf.symbol
          || leaf['attr-name']
          || leaf.selector),
        'text-gray-800 dark:text-gray-300': leaf.punctuation,
        'text-green-600': (leaf.string || leaf.char),
        'text-red-400 dark:text-red-300': (leaf.function || leaf['class-name']),
      })}
    >
      {children}
    </span>
  );
}

const languages = ['Text', 'Go', 'HTML', 'HTTP', 'Java', 'JavaScript', 'JSON', 'Python', 'Ruby'];

export default function CodeBlock({ children, element }) {
  const parentEditor = React.useContext(GuideEditorContext);
  const [editor] = React.useState(withHistory(withReact(createEditor())));
  const [value, setValue] = React.useState(element.content || [{ type: 'paragraph', children: [{ text: '' }] }]);
  const [language, setLanguage] = React.useState(element.language || 'text');
  const path = parentEditor && ReactEditor.findPath(editor, element);

  const renderElement = React.useCallback((props) => <Element {...props} />, []);
  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

  useHotkeys('tab', (e) => {
    e.preventDefault();
    editor.insertText('\u0009');
  }, { enableOnContentEditable: true });

  useHotkeys('shift+tab', (e) => {
    e.preventDefault();
    editor.deleteBackward();
  }, { enableOnContentEditable: true });

  if (!parentEditor) return (
    <div contentEditable={false} className="py-2">
      <Slate editor={editor} value={value} onChange={() => {}} key={value}>
        <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-900 rounded-t py-3">
          <div className="flex items-center pl-4">
            <span className="text-xs mr-2 text-gray-400">Language</span>
            <Badge color="gray">{languages.find((l) => l.toLowerCase() === language)}</Badge>
          </div>
        </div>
        <div className="text-black dark:text-white text-sm">
          <pre className="!p-4 !m-0 !text-xs !rounded-none !rounded-b">
            <Editable
              readOnly
              decorate={(value) => highlightCode(value, language)}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              className="code-block-editor"
              placeholder="Write some code..."
              spellCheck={false}
            />
          </pre>
        </div>
      </Slate>
      {children}
    </div>
  );

  return (
    <div contentEditable={false} className="py-2">
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          setValue(value);
          Transforms.setNodes(parentEditor.editor, { language, content: value }, { at: path });
        }}
      >
        <div className="flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 rounded-t py-1">
          <div className="flex items-center pl-4">
            <span className="text-xs mr-2 text-gray-400">Language</span>
            <Select
              name="language"
              className="!h-6 dark:bg-black !text-xs block transition duration-200"
              onChange={(e) => {
                const { value } = e.target;
                setLanguage(value);
                Transforms.setNodes(parentEditor.editor, { language: value }, { at: path });
              }}
            >
              {languages.map((l) => <option key={l} value={l.toLowerCase()} selected={l.toLowerCase() === language}>{l}</option>)}
            </Select>
          </div>
          <button
            type="button"
            className="py-2 px-3"
            onClick={() => {
              Transforms.removeNodes(parentEditor.editor, { at: path });
              Transforms.insertNodes(parentEditor.editor, [{ type: 'paragraph', children: [{ text: '' }] }]);
            }}
          >
            <Icon icon={faXmark} className="text-gray-400" />
          </button>
        </div>
        <div className="text-black dark:text-white text-sm">
          <pre className="!p-4 !m-0 !text-xs !rounded-none !rounded-b">
            <Editable
              decorate={(value) => highlightCode(value, language)}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              className="code-block-editor"
              placeholder="Write some code..."
              spellCheck={false}
            />
          </pre>
        </div>
      </Slate>
      {children}
    </div>
  );
}

Element.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
};

Leaf.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  leaf: PropTypes.shape({
    'attr-name': PropTypes.bool,
    boolean: PropTypes.bool,
    char: PropTypes.bool,
    'class-name': PropTypes.bool,
    comment: PropTypes.bool,
    constant: PropTypes.bool,
    function: PropTypes.bool,
    keyword: PropTypes.bool,
    number: PropTypes.bool,
    operator: PropTypes.bool,
    punctuation: PropTypes.bool,
    regex: PropTypes.bool,
    selector: PropTypes.bool,
    string: PropTypes.bool,
    symbol: PropTypes.bool,
    tag: PropTypes.bool,
    url: PropTypes.bool,
    variable: PropTypes.bool,
  }),
};

CodeBlock.propTypes = {
  attributes: PropTypes.any,
  children: PropTypes.node,
  element: PropTypes.any,
};
