import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss';
import styled, { ThemeProvider } from 'styled-components';

// component imports
import Footer from './components/Footer';
import Menu from './components/Menu';
import Typography from './components/Typography';

// page imports
import Home from './pages/Home';

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
  margin: 1em 2em;
`;

function App() {

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme("dark");
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (event) => setTheme(event.matches ? "dark" : "light"));
    }
  }, []);

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <OverflowWrap>
        <AppWrapper>
          <Menu/>

          <Switch>
            <Route path="/pricing">
              <Typography bold>Hello, pricing will live here.</Typography>
            </Route>
            <Route path="/commissions">
              <Typography bold>Hello, a commission form will live here.</Typography>
            </Route>
            <Route path="/our-work">
              <Typography bold>Hello, our gallery of projects will live here.</Typography>
            </Route>
            <Route path="/contact">
              <Typography bold>Hello, our contact details will live here.</Typography>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>

          <Footer
            text="Cutie Club is a collaborative project between Amber Holly and Callum Hart."
          />
          
        </AppWrapper>
      </OverflowWrap>
    </ThemeProvider>
  );
}

export default App;
