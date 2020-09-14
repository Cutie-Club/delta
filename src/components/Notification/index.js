import React, { useState } from 'react';

import styled from 'styled-components';
import theme from "styled-theming";
import palette from "../../assets/theme.js"

import Button from "../Button";

const backgroundColour = theme("mode", palette.accentColour);

const NotificationWrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content: space-between;
  flex-direction: row wrap;

  max-width: 75%;
  margin: 1em auto;
  background-color: ${backgroundColour};
  border-radius: .5em;
  padding: 0.5em 2em;
`;

const NotificationContent = styled.div`
  display: inline-flex;
  align-items: center;
`;

function Notification(props) {
  const [open, setOpen] = useState(true);

  let externalControl = false;
  if (props.open !== undefined) externalControl = true;

  if ((externalControl && !props.open) || (!externalControl && !open)) return <></>;
  const closeNotification = () => {
    if (props.onClose) props.onClose();
    if (!externalControl) setOpen(false);
  }

  return (
    <NotificationWrapper>
      <NotificationContent>{props.children}</NotificationContent>
      <Button onClick={closeNotification} text="Close" kind="link"/>
    </NotificationWrapper>
  )
}

export default Notification;