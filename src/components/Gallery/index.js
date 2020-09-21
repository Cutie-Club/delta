import React from 'react';
import styled, { css } from 'styled-components';
import Typography from '../Typography';

const GalleryItem = styled.div`
  display: flex;
  margin-bottom: 2em;
`;

const Description = styled.div`
  width: 50%;
  margin: 1em;
  > p { margin: 0; }
  > p:not(:first-child) { margin: 0.25em; }
  ${props => (props.index % 2) && css`text-align: right;`}
`;

const GalleryImage = styled.img`
  object-fit: cover;
  width: 50%;
  border-radius: 1em;
  max-height: 20em;
`;

function Gallery(props) {
  return (
    <>
      {props.data.map((item, index) => {
        const image = <GalleryImage src={item.image} alt={item.alt} />;
        const description = <Description index={index}>
          <Typography bold size="medium">{item.title}</Typography>
          <Typography size="small">{item.description}</Typography>
        </Description>;
        return (
          <GalleryItem key={index}>
            {index % 2 ? description : image}
            {index % 2 ? image : description}
          </GalleryItem>
        )
      })}
    </>
  );
}

Gallery.defaultProps = {
  data: [
    {
      title: "We're Working On Something",
      description: "Whoops! Looks like we couldn't get a list of our work. I'm sure it's around here somewhere. You could ask us for examples, or look for them on our social media platforms!",
      image: "https://kicad-pcb.org/img/frontpage/kicad_3dviewer.png",
      alt: "A picture of a sad face"
    }
  ]
}

export default Gallery;