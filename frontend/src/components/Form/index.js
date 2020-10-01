import React, { useState } from "react";
import styled from "styled-components";

import Typography from '../Typography';

const submissionHandler = (event, action, method, setFormSubmitted) => {
  event.preventDefault();
  const HTMLForm = event.target;
  const form = new FormData(HTMLForm);

  fetch(action, {
    method: method,
    body: form,
  }).then((res) => {
    if (res.status === 200) return setFormSubmitted("success");
    setFormSubmitted("failure");
  }).catch(() => {
    setFormSubmitted("failure");
  });
};

function Form(props) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (formSubmitted)
    return (
      <>
        <Typography>{props.formMessageObject[formSubmitted]}</Typography>
        {formSubmitted === "failure" ? (
          <button onClick={() => setFormSubmitted(false)}>Reset</button>
        ) : undefined}
      </>
    );

  return (
    <form
      onSubmit={(event) =>
        submissionHandler(event, props.action, props.method, setFormSubmitted)
      }
    >
      {props.children}
    </form>
  );
}

Form.defaultProps = {
  "formMessageObject" : {
    "success": "Form submitted",
    "failure": "Form did not submit"
  }
}

export default Form;
