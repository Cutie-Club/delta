import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import palette from '../../assets/theme.js';

import Typography from '../Typography';

const textColour = theme("mode", palette.primaryColour);
const backgroundColour = theme("mode", palette.secondaryColour);

const Background = styled.div`
  z-index: 10;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.4);

  ${props => {
    if (props.open) return (
      `opacity: 100%;
      visibility: visible;`
    )
    return (
      `opacity: 0%;
      visibility: hidden;`
    )
  }}

  transition: opacity .4s ease;
`

const MenuBox = styled.div`
  color: ${textColour};
  background-color: ${backgroundColour};
  height: ${window.screen.height}px;
  width: 50vw;
  z-index: 50; // will display above everything else
  position: fixed;
  
  right: 0%; // controls it being hidden or not
  display: flex;
  align-items: baseline;
  justify-content: space-around;
  flex-direction: column;

  ${props => {
    if (props.open) return (`right: 0%;`)
    return (`right: -100%;`)
  }};

  transition: right .4s ease;
`

const Links = styled.div`
  color: ${textColour};
  height: 50%;
  text-align: left;
  margin: 2em;
`

function Menu(props) {
  return (
  <>
    <Background open={props.open}></Background>
    <MenuBox open={props.open}>
      
      {/* close button */}
      {/* menu items */}
      <Links>
        <Typography size="regular">Pricing</Typography>
        <Typography size="regular">Commissions</Typography>
        <Typography size="regular">Projects</Typography>
        <Typography size="regular">Contact</Typography>
      </Links>
      
      {/* social media buttons */}
      
    </MenuBox>
  </>
  )
}

export default Menu;
