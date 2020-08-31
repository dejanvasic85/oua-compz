// Generated with util/create-component.js
import React from 'react';

import { ButtonProps } from './Button.types';

import './Button.scss';

const Button = ({ children }: ButtonProps) => (
  <button data-testid="Button" className="oua-btn">
    {children}
  </button>
);

export default Button;
