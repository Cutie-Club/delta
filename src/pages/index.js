import React from 'react';
import { BiMoney, BiEnvelope, BiMicrochip, BiPhotoAlbum } from 'react-icons/bi';
import Typography from '../components/Typography';

import Home from "./Home";
import Pricing from "./Pricing";
import Error from "./Error";

const pages = [
  {
    route: "/",
    hidden: true,
    component: Home
  },
  {
    name: "Pricing",
    route: "/pricing",
    component: Pricing,
    icon: BiMoney
  },
  {
    name: "Commissions",
    route: "/commissions",
    component: <Typography>Commish bish</Typography>,
    icon: BiMicrochip
  },
  {
    name: "Our Work",
    route: "/our-work",
    component: <Typography>Gallery hoes</Typography>,
    icon: BiPhotoAlbum
  },
  {
    name: "Contact",
    route: "/contact",
    component: <Typography>Ring ring sexy</Typography>,
    icon: BiEnvelope
  },
  {
    hidden: true,
    component: Error
  }
]

export default pages;