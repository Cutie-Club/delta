import React from "react";
import styled from 'styled-components';
import theme from 'styled-theming';
import palette from '../../assets/theme.js';

import Typography from "../../components/Typography";

import { BiEnvelope } from 'react-icons/bi';
import { SiDiscord, SiGithub, SiInstagram, SiTwitter } from 'react-icons/si';

const textColour = theme("mode", palette.primaryColour);

// social media link object
const socialList = {
  Discord: {
    href: "https://discord.gg/yVhCvTd",
    "aria-label": "Join our Discord server.",
    svg: <SiDiscord/>,
  },
  Twitter: {
    href: "https://twitter.com/cutieclub_cc",
    "aria-label": "Follow us on Twitter.",
    svg: <SiTwitter/>,
  },
  Instagram: {
    href: "https://instagram.com/cutieclub_cc",
    "aria-label": "Follow us on Instagram.",
    svg: <SiInstagram/>,
  },
  GitHub: {
    href: "https://github.com/Cutie-Club",
    "aria-label": "Explore our GitHub.",
    svg: <SiGithub/>,
  },
  Email: {
    href: "mailto:hello@cutieclub.cc",
    "aria-label": "Send us an email.",
    svg: <BiEnvelope/>,
  },
};

const FooterWrapper = styled.footer``;

const SocialIcons = styled.div`
  svg {
    margin: .25em;
    color: ${textColour};
    transition: color .2s ease;
  }

  svg:hover { color: hotpink; }

  
`;

function Footer(props) {
  return (
    <FooterWrapper>
      <Typography size="small">connect with us on your favourite platform:</Typography>

      <SocialIcons>
        {Object.entries(socialList).map(([serviceName, service], index) => {
          return (
            <a href={service.href} key={index}>
              {service.svg}
            </a>
          );
        })}
      </SocialIcons>
      
      <Typography >{props.text}</Typography>
      <Typography bold size="small">{`© ${new Date().getFullYear()} Cutie Club`}</Typography>
    </FooterWrapper>
  );
}

export default Footer;
