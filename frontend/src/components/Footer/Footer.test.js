import React from 'react';
import { render } from '@testing-library/react';
import Footer from './';

test("renders text passed through props", () => {
  const { getByText } = render(<Footer text="This is a test string!" />);
  const textElement = getByText("This is a test string!");
  expect(textElement).toBeInTheDocument();
});