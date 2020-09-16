import React from 'react';
import CCLogo from '../../components/CCLogo';
import Typography from '../../components/Typography';

function Home(props) {
  return (
    <>
      <CCLogo />

      <section>
        <Typography bold size="medium">We design and assemble custom electronics, enclosures, and mechanical keyboard parts. We can turn your ideas into working prototypes, and help you see them into production.</Typography>
      </section>
    </>
  )
};

export default Home;