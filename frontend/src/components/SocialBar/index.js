import React from "react";
import styled from 'styled-components';
import theme from 'styled-theming';


import palette from '../../assets/theme.js';
import socialLinks from './socialLinks.js';

const textColour = theme("mode", palette.primaryColour);
const accentColour = theme("mode", palette.accentColour);


const SocialIcons = styled.div`
  svg {
    margin: .25em .5em;
    color: ${textColour};
    transition: color ${palette.animationTime.short} ease;
  }
  svg:hover { color: ${accentColour}; }
`;

function SocialBar() {
  return <SocialIcons>
    {Object.entries(socialLinks).map(([serviceName, service], index) => {
      return (
        <a href={service.href} key={index}>
          <service.svg size="2em" />
        </a>
      );
    })}
  </SocialIcons>
}

export default SocialBar;
