import React, { useState } from 'react';
import './Notification.scss';

function Notification(props) {
  const [open, setOpen] = useState(true);

  let externalControl = false;
  if (props.open !== undefined) externalControl = true;

  if ((externalControl && !props.open) || (!externalControl && !open)) return <></>;
  const closeNotification = () => {
    if (props.onClose) props.onClose();
    if (!externalControl) setOpen(false);
  }

  console.log(props);
  return (
    <div className="notification">
      <div className="notification-content">{props.children}</div>
      <button onClick={closeNotification}>Close</button>
    </div>
  )
}

export default Notification;