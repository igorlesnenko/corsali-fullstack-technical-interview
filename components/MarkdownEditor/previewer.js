import React from 'react';
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types';

function MarkdownPreviewer({ value }) {
  return (
    <div style={{ padding: '0 10px' }}>
    <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  )
}

MarkdownPreviewer.propTypes = {
  value: PropTypes.string,
};
export default MarkdownPreviewer;