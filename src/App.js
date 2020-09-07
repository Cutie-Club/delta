import React from 'react';
import './App.scss';

// component imports
import CCLogo from './components/CCLogo';
import Footer from './components/Footer';
import Button from './components/Button';

function App() {
  return (
    <div className="wrapper">

      <header>
        <CCLogo/>
      </header>

      {/* some kind of notification bar/box thing that people can click around on? */}
      <section>
        <p>Our commissions are currently open!</p>
        <Button className="primary" text="Get a commission"/>
      </section>

      <section className="blurb">
        <p>We design and assemble custom electronics and mechanical keyboard parts. We can turn your ideas into working prototypes, and help you see them into production.</p>
      </section>
      
      <Footer
        text="Cutie Club is a collaborative project between Amber Holly and Callum Hart."
      />
    </div>
  );
}

export default App;
