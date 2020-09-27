import React from 'react';
import { render } from '@testing-library/react';
import SocialBar from './';
import socialLinks from './socialLinks';

const correctAmountOfLinks = Object.keys(socialLinks).length;

test("renders correct amount of links", () => {
    const { getAllByRole } = render(<SocialBar/>);
    const linkItems = getAllByRole("link");
    expect(linkItems.length).toStrictEqual(correctAmountOfLinks);
});

test("renders correct amount of icons", () => {
    const { getAllByRole } = render(<SocialBar/>);
    const svgItems = getAllByRole("img");
    expect(svgItems.length).toStrictEqual(correctAmountOfLinks);
});