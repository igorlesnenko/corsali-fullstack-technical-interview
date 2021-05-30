import React from 'react';
import ReactMarkdown from 'react-markdown'

function MarkdownPreviewer ({ value }) {
  return (
    <div style={{ padding: '0 10px' }}>
    <ReactMarkdown>{value}</ReactMarkdown>
    </div>
  )
}

export default MarkdownPreviewer;