import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../Loader";
import Typography from '../Typography';

const submissionHandler = (event, action, method, setFormSubmitted) => {
  event.preventDefault();
  const HTMLForm = event.target;
  const form = new FormData(HTMLForm);

  setFormSubmitted("loading");

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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  > * {
    margin: .5em 0;
  }
`;

function Form(props) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (formSubmitted && formSubmitted !== "loading")
    return (
      <>
        <Typography>{props.formMessageObject[formSubmitted]}</Typography>
        {formSubmitted === "failure" ? (
          <button onClick={() => setFormSubmitted(false)}>Reset</button>
        ) : undefined}
      </>
    );

  if (formSubmitted === "loading") return (<Loader/>)

  return (
    <FormWrapper
      onSubmit={(event) =>
        submissionHandler(event, props.action, props.method, setFormSubmitted)
      }
    >
      {props.children}
    </FormWrapper>
  );
}

Form.defaultProps = {
  "formMessageObject" : {
    "success": "Form submitted",
    "failure": "Form did not submit"
  }
}

export default Form;
