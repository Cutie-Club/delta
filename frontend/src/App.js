import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'wouter';

import './App.scss';
import styled, { ThemeProvider } from 'styled-components';

// component imports
import CCLogo from './components/CCLogo';
import Footer from './components/Footer';
import Menu from './components/Menu';

// page imports
import pages from './pages';

// some browsers ignore overflow attributes on html and body tags
const OverflowWrap = styled.div`
  position: relative;
  overflow: hidden;
  min-height: ${window.innerHeight}px;
  margin: 0 auto;
  padding: 0;
`;

const AppWrapper = styled.div`
  max-width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
          <CCLogo />
          <Menu />
          
          <Switch>
            {pages.map((page, index) => {
              return (
                <Route path={page.route} key={index}>
                  {params => {
                    document.title = `${page.name ? page.name + " | " : ""}Cutie Club`;
                    return <page.component params={params} />
                  }}
                </Route>
              )
            })}
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
