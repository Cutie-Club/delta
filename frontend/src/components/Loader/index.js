import React from 'react';
import styled, { keyframes } from 'styled-components';
import palette from "../../assets/theme";
import theme from 'styled-theming';

const loaderColour = theme("mode", palette.accentColour);

const grow = keyframes`
  from { transform: scale(0.8); }
  to { transform: scale(1); }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  svg {
    animation: ${grow} 1.75s ease-in-out infinite;
    animation-direction: alternate;
    width: 6em;
    color: ${loaderColour};
  }
`

function Loader() {
  return (
    <LoaderWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="1.5" clipRule="evenodd" viewBox="0 0 89 63">
        <g stroke="currentColor" strokeWidth="6.75" fill="currentColor">
          <path d="M13.337 6.044c9.522-5.497 21.717-2.23 27.215 7.293 5.498 9.522 2.23 21.717-7.292 27.215-9.523 5.498-21.717 2.23-27.216-7.292-5.497-9.523-2.23-21.717 7.293-27.216z" />
          <path d="M44.111 59.348L13.337 40.552l29.799-17.576.975 36.372z" />
        </g>
        <g stroke="currentColor" strokeWidth="6.75" fill="currentColor">
          <path d="M74.886 6.044c-9.523-5.497-21.718-2.23-27.215 7.293-5.498 9.522-2.231 21.717 7.292 27.215 9.523 5.498 21.717 2.23 27.215-7.292 5.498-9.523 2.231-21.717-7.292-27.216z" />
          <path d="M44.111 59.348l30.775-18.796-29.799-17.576-.976 36.372z" />
        </g>
      </svg>
    </LoaderWrapper>
  )
}

export default Loader;