import React from "react";
import styled from "styled-components";

import Typography from "../../components/Typography";

// social media link object
const socialList = {
  Discord: {
    href: "https://discord.gg/yVhCvTd",
    "aria-label": "Join our Discord server.",
    svg: "",
  },
  GitHub: {
    href: "https://github.com/Cutie-Club",
    "aria-label": "Explore our GitHub.",
    svg: "",
  },
  Email: {
    href: "mailto:hello@cutieclub.cc",
    "aria-label": "Send us an email.",
    svg: "",
  },
  Twitter: {
    href: "https://twitter.com/cutieclub_cc",
    "aria-label": "Follow us on Twitter.",
    svg: "",
  },
  Instagram: {
    href: "https://instagram.com/cutieclub_cc",
    "aria-label": "Follow us on Instagram.",
    svg: "",
  },
};

const FooterWrapper = styled.footer``;

function Footer(props) {
  return (
    <FooterWrapper>
      <Typography size="small">connect with us on your favourite platform:</Typography>

      <>
        {Object.entries(socialList).map(([serviceName, service], index) => {
          return (
            <a href={service.href} key={index}>
              <img src={service.svg} alt={`${serviceName} icon`}></img>
            </a>
          );
        })}
      </>
      
      <Typography >{props.text}</Typography>
      <Typography bold size="small">{`© ${new Date().getFullYear()} Cutie Club`}</Typography>
    </FooterWrapper>
  );
}

export default Footer;
