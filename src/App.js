import React, { useState, useEffect } from 'react';
import './App.scss';
import styled, { ThemeProvider } from 'styled-components';

// component imports
import Button from './components/Button';
import CCLogo from './components/CCLogo';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Typography from './components/Typography';
import Menu from './components/Menu';


// some browsers ignore overflow attributes on html and body tags
const OverflowWrap = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const AppWrapper = styled.div`
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
`;

const MenuButton = styled(Button)`
  z-index: 999;
  position: fixed;
  right: 0;
`;

function App() {

  const [open, setOpen] = useState(true);
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
            text={(menuOpen === true) ? "Close" : "Menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          />

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
