import React, { useState, useEffect } from 'react';
import './App.scss';
import styled, { ThemeProvider } from 'styled-components';

// component imports
import CCLogo from './components/CCLogo';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Typography from './components/Typography';
import Menu from './components/Menu';

import { BiMenu, BiX } from 'react-icons/bi';

// some browsers ignore overflow attributes on html and body tags
const OverflowWrap = styled.div`
  position: relative;
  overflow: hidden;
  min-height: ${window.innerHeight}px;
  margin: 0;
  padding: 0;
`;

const AppWrapper = styled.div`
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  margin: 0em 2em;
`;

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

function App() {

  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (event) => setTheme(event.matches ? "dark" : "light"));
    }
  }, []);

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <OverflowWrap>
        <AppWrapper>

          <MenuButton
            onClick={() => setMenuOpen(!menuOpen)}
            active={menuOpen}
          >

            {menuOpen ? <BiX size="75%"/> : <BiMenu size="75%"/>}
            
          </MenuButton>

          <CCLogo />

          <section>
            <Notification
              open={open}
              onClose={() => setOpen(false)}
            >
              <Typography>Our commissions are open!</Typography>
            </Notification>
          </section>

          <section>
            <Typography bold size="medium">We design and assemble custom electronics, enclosures, and mechanical keyboard parts. We can turn your ideas into working prototypes, and help you see them into production.</Typography>
          </section>

          <Footer
            text="Cutie Club is a collaborative project between Amber Holly and Callum Hart."
          />

          <Menu open={menuOpen}></Menu>
        </AppWrapper>
      </OverflowWrap>
    </ThemeProvider>
  );
}

export default App;
