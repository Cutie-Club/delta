import React, { useState } from "react";
import styled from "styled-components";
import Form from "../../components/Form";
import Typography from "../../components/Typography";

const Wrapper = styled.section`
  max-width: 80ch;
`;

const Button = styled.button`
  padding: 0.25em 0.75em;
  background-color: transparent;
  border: 0.1em solid #444;
  border-radius: 0.5em;
  margin: 1em 0em;
`;

function Commissions(props) {
  const [formActive, setFormActive] = useState(false);

  return (
    <Wrapper>
      <Typography bold size="large">
        Commissions
      </Typography>
      <Typography>
        We facilitate PCB design and prototyping, and provide small scale PCB
        assembly in-house. We will work with you and your product vendor for
        large scale production runs.
      </Typography>

      <Typography bold>PCB Design</Typography>
      <Typography>
        We create a design that fits your needs, and supply everything needed
        for production. PCBs can be ordered through us, with an in-house
        assembly service for prototyping.
      </Typography>
      <Button onClick={() => setFormActive(true)}>Get a Commission</Button>
      {formActive && (
        <Form method="POST" action="http://localhost:3001/commissions">
          <input></input>
          <button>tttt</button>
        </Form>
      )}
    </Wrapper>
  );
}

export default Commissions;
