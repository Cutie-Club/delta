import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  screen,
  render,
  waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./";

const server = setupServer(
  rest.post("/commissions", (req, res, ctx) => res(ctx.status(200)))
);

const stateListener = jest.fn();

beforeAll(() => server.listen());

beforeEach(() => {
  stateListener.mockClear();
  render(
    <Form method="POST" onStateChange={stateListener} action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders child props", () => {
  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("calls onStateChange when loading", async () => {
  const inputTextbox = screen.getByRole("textbox");
  const submitButton = screen.getByText("Submit");

  userEvent.type(inputTextbox, "My Cool Name");
  userEvent.click(submitButton);

  expect(stateListener).toHaveBeenCalledWith("loading");
  await screen.findByText("Submit");
});

test("calls onStateChange when success", async () => {
  const inputTextbox = screen.getByRole("textbox");
  const submitButton = screen.getByText("Submit");

  userEvent.type(inputTextbox, "My Cool Name");
  userEvent.click(submitButton);

  await screen.findByText("Submit");

  expect(stateListener).toHaveBeenCalledWith("success");
});

test("calls onStateChange when failed", async () => {
  server.use(
    rest.post("/commissions", (req, res, ctx) => res(ctx.status(500)))
  );

  const inputTextbox = screen.getByRole("textbox");
  const submitButton = screen.getByText("Submit");

  userEvent.type(inputTextbox, "My Cool Name");
  userEvent.click(submitButton);

  await screen.findByText("Submit");

  expect(stateListener).toHaveBeenCalledWith("failure");
});
