import { BiEnvelope, BiMicrochip, BiPhotoAlbum } from 'react-icons/bi';

import Home from "./Home";
import Error from "./Error";
import Commissions from './Commissions';
import Portfolio from './Portfolio';
import Contact from './Contact';

const pages = [
  {
    route: "/",
    hidden: true,
    component: Home
  },
  {
    name: "Commissions",
    route: "/commissions",
    component: Commissions,
    icon: BiMicrochip
  },
  {
    name: "Portfolio",
    route: "/portfolio",
    component: Portfolio,
    icon: BiPhotoAlbum
  },
  {
    name: "Contact",
    route: "/contact",
    component: Contact,
    icon: BiEnvelope
  },
  {
    hidden: true,
    component: Error
  }
]

export default pages;