import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "../Loader";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  > * {
    margin: .5em 0;
  }
`;

const submissionHandler = async (event, action, method, setFormState) => {
  event.preventDefault();
  const HTMLForm = event.target;
  const form = new FormData(HTMLForm);

  setFormState("loading");

  try {
    const response = await fetch(action, {
      method: method,
      body: form,
    })

    if (response.status === 200) {
      setFormState("success");
    } else {
      setFormState("failure");
    }
  } catch {
    setFormState("failure");
  }
};

function Form(props) {
  const [formState, setFormState] = useState();
  const { onStateChange } = props;

  useEffect(() => {
    if (!onStateChange || !formState) return;
    onStateChange(formState);
  }, [formState, onStateChange])

  if (formState === "loading") return (<Loader />)

  return (
    <FormWrapper
      onSubmit={(event) =>
        submissionHandler(event, props.action, props.method, setFormState)
      }
    >
      {props.children}
    </FormWrapper>
  );
}

export default Form;
