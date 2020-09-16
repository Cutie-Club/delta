import React from "react";

import Typography from "../Typography";
import SocialBar from "../SocialBar";

function Footer(props) {
  return (
    <footer>
      <Typography size="small">connect with us on your favourite platform:</Typography>
      <SocialBar/>
      
      <Typography size="small">{props.text}</Typography>
      <Typography bold size="small">{`© ${new Date().getFullYear()} Cutie Club`}</Typography>
    </footer>
  );
}

export default Footer;
