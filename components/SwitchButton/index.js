import React from 'react';
import PropTypes from 'prop-types';

import css from './SwitchButton.module.css';

function SwitchButton ({ checked, label, onChange }) {
  return (
    <label className={css.switch}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={`${css.slider} ${css.round}`}></span>
    </label>
  )
}

SwitchButton.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

export default SwitchButton;