import React, { useState } from 'react';
import './App.scss';

// component imports
import CCLogo from './components/CCLogo';
import Footer from './components/Footer';
import Button from './components/Button';
import Notification from './components/Notification';

function App() {

  const [open, setOpen] = useState(true);

  return (
    <div className="wrapper">

      <CCLogo />

      <section>
        <Notification
          open={open}
          onClose={() => setOpen(false)}
        >
          <p>Our commissions are open!</p>
          <Button onClick={()=> setOpen(false)} text="click me" className="primary"></Button>
        </Notification>
      </section>

      <section className="blurb">
        <p>We design and assemble custom electronics, enclosures, and mechanical keyboard parts. We can turn your ideas into working prototypes, and help you see them into production.</p>
      </section>

      <Footer
        text="Cutie Club is a collaborative project between Amber Holly and Callum Hart."
      />
    </div>
  );
}

export default App;
