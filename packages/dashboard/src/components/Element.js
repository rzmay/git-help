import PropTypes from 'prop-types';
import React from 'react';
import Attachment from './blocks/Attachment';
import Audio from './blocks/Audio';
import Blockquote from './blocks/Blockquote';
import Callout from './blocks/Callout';
import CodeBlock from './blocks/CodeBlock';
import Divider from './blocks/Divider';
import Embed from './blocks/Embed';
import EmbedLink from './blocks/EmbedLink';
import Heading1 from './blocks/Heading1';
import Heading2 from './blocks/Heading2';
import Heading3 from './blocks/Heading3';
import Image from './blocks/Image';
import Link from './blocks/Link';
import ListItem from './blocks/ListItem';
import Paragraph from './blocks/Paragraph';
import Table from './blocks/Table';
import TableBody from './blocks/TableBody';
import TableCell from './blocks/TableCell';
import TableRow from './blocks/TableRow';
import Video from './blocks/Video';

export default function Element({ children, ...props }) {
  props.attributes['data-slate-node-type'] = props.element.type;

  switch (props.element.type) {
    case 'block-quote':
      return <Blockquote {...props}>{children}</Blockquote>;
    case 'ordered-list':
      return <ol {...props.attributes}>{children}</ol>;
    case 'bulleted-list':
      return <ul {...props.attributes}>{children}</ul>;
    case 'table':
      return <Table {...props.attributes}>{children}</Table>;
    case 'table-body':
      return <TableBody {...props.attributes}>{children}</TableBody>;
    case 'table-row':
      return <TableRow {...props.attributes}>{children}</TableRow>;
    case 'table-cell':
      return <TableCell {...props.attributes}>{children}</TableCell>;
    case 'heading-1':
      return <Heading1 {...props}>{children}</Heading1>;
    case 'heading-2':
      return <Heading2 {...props}>{children}</Heading2>;
    case 'heading-3':
      return <Heading3 {...props}>{children}</Heading3>;
    case 'list-item':
      return <ListItem {...props}>{children}</ListItem>;
    case 'divider':
      return <Divider {...props.attributes}>{children}</Divider>;
    case 'image':
      return <Image {...props}>{children}</Image>;
    case 'video':
      return <Video {...props}>{children}</Video>;
    case 'audio':
      return <Audio {...props}>{children}</Audio>;
    case 'embed':
      return <Embed {...props}>{children}</Embed>;
    case 'embed-link':
      return <EmbedLink {...props}>{children}</EmbedLink>;
    case 'link':
      return <Link {...props}>{children}</Link>;
    case 'callout':
      return <Callout {...props}>{children}</Callout>;
    case 'attachment':
      return <Attachment {...props}>{children}</Attachment>;
    case 'code-block':
      return <CodeBlock {...props}>{children}</CodeBlock>;
    default:
      return <Paragraph {...props}>{children}</Paragraph>;
  }
}

Element.propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node,
  element: PropTypes.shape({
    type: PropTypes.string,
  }),
};
