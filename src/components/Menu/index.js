import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import palette from '../../assets/theme.js';

import Typography from '../Typography';

import { BiMenu, BiX, BiMoney, BiEnvelope, BiMicrochip, BiStore } from 'react-icons/bi';

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

const MenuButton = styled.button`
  z-index: 999;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 3em;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  border: none;
  text-align: center;

  ${props => {
    if (props.active) return (
      `background-color: white;
      color: black;`
    )
    return (
      `background-color: black;
      color: white;`
    )
  }}

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px hotpink;
  }

  > * {
    vertical-align: middle;
    text-align: center;
  }
  
`;


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
`;

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

`;

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MenuButton
        onClick={() => setMenuOpen(!menuOpen)}
        active={menuOpen}
      >
        {menuOpen ? <BiX size="75%" /> : <BiMenu size="75%" />}
      </MenuButton>

      <Background open={menuOpen}></Background>
      <MenuBox open={menuOpen}>
        <MenuItem>
          <Typography>Pricing</Typography>
          <BiMoney size="1.5em" />
        </MenuItem>
        <MenuItem>
          <Typography>Commissions</Typography>
          <BiMicrochip size="1.5em" />
        </MenuItem>
        <MenuItem>
          <Typography>Our Work</Typography>
          <BiStore size="1.5em" />
        </MenuItem>
        <MenuItem>
          <Typography>Contact</Typography>
          <BiEnvelope size="1.5em" />
        </MenuItem>

      </MenuBox>
    </>
  )
}

export default Menu;
