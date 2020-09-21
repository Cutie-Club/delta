import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { Link } from 'wouter';

import palette from '../../assets/theme.js';
import Typography from '../Typography';

import { BiX, BiMenu } from 'react-icons/bi';

import pages from '../../pages';

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
    if (props.open) return (
      `bottom: 0%;
      visibility: visible;`
    )
    return (`bottom: -100%; visibility: hidden;`)
  }};

  transition: all .25s ease;
  transition-property: bottom, visibility;
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
    cursor: pointer;
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

      <Background open={menuOpen} onClick={() => setMenuOpen(false)}/>
      
      <MenuBox open={menuOpen}>
        {pages.map((page, index) => {
          if (!page.hidden) return (            
            <Link href={page.route} onClick={() => setMenuOpen(false)} key={index}>
              <MenuItem>
                <Typography>{page.name}</Typography>
                <page.icon size="1.5em" />
              </MenuItem>
            </Link>
          )
          return undefined;
        })}
      </MenuBox>
    </>
  )
}

export default Menu;
