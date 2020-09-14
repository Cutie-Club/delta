import styled, {css} from 'styled-components';
import theme from "styled-theming";
import palette from "../../assets/theme.js"

const textColour = theme("mode", palette.primaryColour);

const Typography = styled.p`
    color: ${textColour};
    font-size: ${props => palette.textSize[props.size]};
    ${props => props.bold && css`font-weight: bold;`}
`;

Typography.defaultProps = {
    size: "regular",
  };

export default Typography;