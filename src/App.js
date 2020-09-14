import React, { useState } from 'react';
import './App.scss';
import styled from 'styled-components';

// component imports
import CCLogo from './components/CCLogo';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Typography from './components/Typography';

const AppWrapper = styled.div`
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
`;

function App() {

  const [open, setOpen] = useState(true);

  return (
    <AppWrapper>

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
    </AppWrapper>
  );
}

export default App;
