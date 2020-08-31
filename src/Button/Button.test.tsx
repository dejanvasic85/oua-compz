// Generated with util/create-component.js
import React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';
import { ButtonProps } from './Button.types';

describe('Test Component', () => {
  let props: ButtonProps;

  const renderComponent = () => render(<Button {...props}>awesome btn</Button>);

  it('should render foo text correctly', () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId('Button');

    expect(component).toHaveTextContent('awesome btn');
  });
});
