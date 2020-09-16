import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import palette from '../../assets/theme.js';

import Typography from '../Typography';

import { BiMoney, BiEnvelope, BiMicrochip, BiStore } from 'react-icons/bi';

const textColour = theme("mode", palette.primaryColour);

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

  transition: all .4s ease;
  transition-property: opacity, visibility;
`

const MenuBox = styled.div`
  color: ${textColour};
  z-index: 50; // will display above everything else
  position: fixed;
  right: 0%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 3em;
  margin-bottom: 7em;

  > * {
    margin: .5em 0em;
  }

  ${props => {
    if (props.open) return (`bottom: 0%;`)
    return (`bottom: -100%;`)
  }};

  transition: bottom .25s ease;
`

const MenuItem = styled.div`
  background-color: white;
  width: max-content;
  padding: 0.25em .5em;
  border-radius: .75em;
  > * {
    font-weight: 500;
    margin: .25em;
    color: black;
  }
  display: flex;
  align-items: center;

`

function Menu(props) {
  return (
  <>
    <Background open={props.open}></Background>
    <MenuBox open={props.open}>
      
      {/* close button */}
      {/* menu items */}
      {/* <Links>
        <Typography size="regular">Pricing</Typography>
        <Typography size="regular">Commissions</Typography>
        <Typography size="regular">Projects</Typography>
        <Typography size="regular">Contact</Typography>
      </Links> */}
      
      <MenuItem>
        <Typography>Pricing</Typography>
        <BiMoney size="1.5em"/>
      </MenuItem>
      <MenuItem>
        <Typography>Commissions</Typography>
        <BiMicrochip size="1.5em"/>
      </MenuItem>
      <MenuItem>
        <Typography>Our Work</Typography>
        <BiStore size="1.5em"/>
      </MenuItem>
      <MenuItem>
        <Typography>Contact</Typography>
        <BiEnvelope size="1.5em"/>
      </MenuItem>

      {/* social media buttons */}
      
    </MenuBox>
  </>
  )
}

export default Menu;
