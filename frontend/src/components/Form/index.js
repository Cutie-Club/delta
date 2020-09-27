import React, { useState } from "react";
import styled from "styled-components";

const submissionHandler = (event, action, method, setFormSubmitted) => {
  event.preventDefault();
  const HTMLForm = event.target;
  const form = new FormData(HTMLForm);
  form.append("name", "test");

  fetch(action, {
    method: method,
    body: form,
  }).then((res) => {
    if (res.status === 200) return setFormSubmitted("success");
    setFormSubmitted("fail");
  });
};

function Form(props) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  let formStatus;

  if (formSubmitted === "success") formStatus = "Form submitted";
  if (formSubmitted === "fail") formStatus = "Form did not submit";

  if (formSubmitted)
    return (
      <>
        <p>{formStatus}</p>
        {formSubmitted === "fail" ? (
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

export default Form;
