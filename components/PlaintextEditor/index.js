import React from 'react';
import PropTypes from 'prop-types';

import css from './style.css';

function PlaintextEditor({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}>
    </textarea>
  );
}

PlaintextEditor.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default PlaintextEditor;
