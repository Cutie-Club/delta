import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./";

const server = setupServer(
  rest.post("/commissions", (req, res, ctx) => res(ctx.status(200)))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders child props", () => {
  const { getByRole } = render(
    <Form>
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );
  const formInput = getByRole("textbox");
  const formButton = getByRole("button");
  expect(formInput).toBeInTheDocument();
  expect(formButton).toBeInTheDocument();
});

test("displays successful response", async () => {
  const { getByText, getByRole } = render(
    <Form method="POST" action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );

  userEvent.type(getByRole("textbox"), "My Cool Name");
  userEvent.click(getByText("Submit"));

  await waitFor(() => expect(getByText("Form submitted")).toBeInTheDocument());
});

test("displays an error when status is not 200", async () => {
  server.use(
    rest.post("/commissions", (req, res, ctx) => res(ctx.status(500)))
  );

  const { getByText, getByRole } = render(
    <Form method="POST" action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );

  userEvent.type(getByRole("textbox"), "My Cool Name");
  userEvent.click(getByText("Submit"));

  await waitFor(() =>
    expect(getByText("Form did not submit")).toBeInTheDocument()
  );
});

test("hides the form on submit", async () => {
  const { getByText, getByRole, queryByRole } = render(
    <Form method="POST" action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );

  const inputTextbox = getByRole("textbox");
  const submitButton = getByText("Submit");

  userEvent.type(inputTextbox, "My Cool Name");
  userEvent.click(submitButton);

  await waitForElementToBeRemoved(() => queryByRole("textbox"));

  expect(inputTextbox).not.toBeInTheDocument();
  expect(submitButton).not.toBeInTheDocument();
});

test("displays a reset button after an error", async () => {
  server.use(
    rest.post("/commissions", (req, res, ctx) => res(ctx.status(500)))
  );

  const { getByText, getByRole, findByText } = render(
    <Form method="POST" action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );

  const inputTextbox = getByRole("textbox");
  const submitButton = getByText("Submit");

  userEvent.type(inputTextbox, "My Cool Name");
  userEvent.click(submitButton);

  const resetButton = await findByText("Reset");

  expect(resetButton).toBeInTheDocument();
});

test("does not display a reset button after a successful submission", async () => {
  const { getByText, getByRole, queryByText } = render(
    <Form method="POST" action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );

  const inputTextbox = getByRole("textbox");
  const submitButton = getByText("Submit");

  userEvent.type(inputTextbox, "My Cool Name");
  userEvent.click(submitButton);

  const resetButton = await queryByText("Reset");

  expect(resetButton).not.toBeInTheDocument();
});

test("returns the form to initial state when reset button pressed", async () => {
  server.use(
    rest.post("/commissions", (req, res, ctx) => res(ctx.status(500)))
  );

  const { getByText, getByRole, findByText, findByRole } = render(
    <Form method="POST" action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );

  let inputTextbox = getByRole("textbox");
  let submitButton = getByText("Submit");

  userEvent.type(inputTextbox, "My Cool Name");
  userEvent.click(submitButton);

  const resetButton = await findByText("Reset");

  userEvent.click(resetButton);

  inputTextbox = await findByRole("textbox");
  submitButton = await findByText("Submit");
  expect(inputTextbox).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(resetButton).not.toBeInTheDocument();
});
