import React from 'react';
import Typography from '../../components/Typography';
import Gallery from '../../components/Gallery';

import galleryData from './galleryData';

function Portfolio(props) {
  return (
    <>
      <section>
        <Typography bold size="medium">Portfolio</Typography>
        <Gallery data={galleryData}/>
      </section>
    </>
  )
};

export default Portfolio;