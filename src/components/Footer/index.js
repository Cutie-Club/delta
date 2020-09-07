import React from "react";
import "./Footer.css";

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

function Footer(props) {
  return (
    <footer>
      <p>connect with us on your favourite platform:</p>

      <div className="social">
        {Object.entries(socialList).map(([serviceName, service], index) => {
          return (
            <a href={service.href} key={index}>
              <img src={service.svg} alt={`${serviceName} icon`}></img>
            </a>
          );
        })}
      </div>
      
      <p>{props.text}</p>
      <p className="legal">{`© ${new Date().getFullYear()} Cutie Club`}</p>
    </footer>
  );
}

export default Footer;
