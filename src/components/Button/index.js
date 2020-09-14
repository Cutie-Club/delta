import React from 'react';
import styled, { css } from 'styled-components';
import theme from "styled-theming";
import palette from "../../assets/theme.js"

const backgroundColour = theme.variants("mode", "kind", palette.buttonBackgroundColour);
const hoverColour = theme.variants("mode", "kind", palette.buttonBackgroundHoverColour);
const textColour = theme("mode", palette.primaryColour);

const StyledButton = styled.button`
  background: ${backgroundColour};
  border: 0.1em solid ${textColour};
  color: ${textColour};
  padding: .25em 2em;
  margin: .5em;
  border-radius: 5em;
  ${props => (props.kind === "primary") && css`
    border-color: ${backgroundColour};
  `}

  ${props => (props.kind === "link") && css`
    background: none;
    border: none;
    color: ${textColour};
    font-weight: bold;
    padding: none;
  `}

  :hover {
    cursor: pointer;
    background-color: ${hoverColour};
    border-color: ${hoverColour};
    color: white;
  }
`

function Button(props) {
  return (
      <StyledButton {...props}>
        {props.text}
      </StyledButton>
  )
}

Button.defaultProps = {
  kind: "secondary",
};

export default Button;

