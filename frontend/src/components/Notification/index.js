import React, { useState } from 'react';
import styled from 'styled-components';

import { BiX, BiSad, BiCool, BiMeh } from 'react-icons/bi';

const NotificationBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: .5em;
  padding: 1em 1.5em;
  background-color: ${props => props.color};
  color: white;

  position: fixed;
  z-index: 5;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 2.5em;

  transition: all 1s ease;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
  * { margin-right: 1em; }
`;

const CloseButton = styled(BiX)`
  cursor: pointer;
  :hover { color: lightgrey; }
  transition: .2s all;
`;

const statusMap = {
  success: {
    color: "green",
    textColor: "white",
    icon: BiCool
  },
  failure: {
    color: "crimson",
    textColor: "white",
    icon: BiSad
  },
  warning: {
    color: "darkorange",
    textColor: "#444",
    icon: BiMeh
  }
}

function Notification({ status, children }) {

  const [active, setActive] = useState(true);
  if (!active) return <></>
  const SelectedStatus = statusMap[status];

  return (
    <NotificationBox color={SelectedStatus.color} active={active}>
      <ContentWrapper>{<SelectedStatus.icon size="2em" />}{children}</ContentWrapper>
      <CloseButton onClick={() => setActive(false)} size="1.5em" />
    </NotificationBox>
  )
}

Notification.defaultProps = {
  status: "success"
}

export default Notification;