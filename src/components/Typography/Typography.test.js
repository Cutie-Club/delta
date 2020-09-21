import React from 'react';
import { render } from '@testing-library/react';
import Typography from './';

test("renders provided text", () => {
  const { getByText } = render(<Typography>This is a test string!</Typography>);
  const textElement = getByText("This is a test string!");
  expect(textElement).toBeInTheDocument();
});