import React from 'react';
import { render } from '@testing-library/react';
import Gallery from './';


const testImageData = [
  {
    title: "Test Item 1",
    description: "a cool bit of text",
    image: "image-url",
    alt: "description of image"
  },
  {
    title: "Random String",
    description: "another excellent piece of text",
    image: "different-image-url",
    alt: "good for a11y"
  },
  {
    title: "Testo",
    description: "some more text",
    image: "funky-url",
    alt: "ensures our site is good for users"
  },
  {
    title: "Testing",
    description: "even more text",
    image: "cool-image.jpeg",
    alt: "describes an image well"
  }
];

test("renders a single given title", () => {
  const { getByText } = render(<Gallery data={testImageData} />);
  const itemTitle = getByText("Test Item 1");
  expect(itemTitle).toBeInTheDocument();
})

test("renders multiple given titles", () => {
  const { getByText } = render(<Gallery data={testImageData} />);
  testImageData.forEach((testItem) => {
    const itemTitle = getByText(testItem.title);
    expect(itemTitle).toBeInTheDocument();
  })
})

test("renders items descriptions", () => {
  const { getByText } = render(<Gallery data={testImageData} />);
  testImageData.forEach((testItem) => {
    const itemDescription = getByText(testItem.description);
    expect(itemDescription).toBeInTheDocument();
  })
})

test("renders correct amount of items images", () => {
    const { getAllByRole } = render(<Gallery data={testImageData} />);
    const productImages = getAllByRole("img");
    expect(productImages.length).toStrictEqual(testImageData.length);
  })

test("renders items images", () => {
  const { getAllByRole } = render(<Gallery data={testImageData} />);
  const productImages = getAllByRole("img");

  productImages.forEach((image, index) => {
    expect(image).toHaveAttribute("src", testImageData[index].image)
  })
})

test("renders items images with an alt tag", () => {
    const { getAllByRole } = render(<Gallery data={testImageData} />);
    const productImages = getAllByRole("img");
  
    productImages.forEach((image, index) => {
      expect(image).toHaveAttribute("alt", testImageData[index].alt)
    })
  })

test("does not crash when no image data is provided", () => {
    expect(() => render(<Gallery/>)).not.toThrowError();
})