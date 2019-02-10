/* eslint-disable no-use-before-define */
import React from 'react';
import { string, node, func } from 'prop-types';

import './Button.css';

Button.propTypes = {
  className: string,
  children: node,
  onClick: func,
};

Button.defaultProps = {
  className: '',
  children: undefined,
  onClick: () => {},
};

function Button(props) {
  return (
    <button
      className={['injected-btn', props.className].join(' ')}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
