import React from 'react';
import { render } from '@testing-library/react';
import Menu from './';

test("renders a button", () => {
  const { getByRole } = render(<Menu />);
  const menuButton = getByRole("button");
  expect(menuButton).toBeInTheDocument();
});