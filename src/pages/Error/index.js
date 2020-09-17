import React from 'react';
import CCLogo from '../../components/CCLogo';
import Typography from '../../components/Typography';

function Error(props) {
  return (
    <>
      <CCLogo />

      <section>
        <Typography bold size="large">404 - Page not found</Typography>
        <Typography size="xsmall">...how embarassing</Typography>
      </section>
    </>
  )
};

export default Error;