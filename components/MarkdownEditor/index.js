import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2'
import PropTypes from 'prop-types';

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/markdown/markdown');
}

function MarkdownEditor({ value, onChange }) {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: 'markdown',
        theme: 'xq-light',
        highlightFormatting: true,
        lineNumbers: true
      }}
      onBeforeChange={(editor, data, value) => {
        onChange(value);
      }}
    />
  );
}

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default MarkdownEditor;
