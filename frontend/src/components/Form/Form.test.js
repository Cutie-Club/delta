import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./";

const server = setupServer(
  rest.post("/commissions", (req, res, ctx) => res(ctx.status(200)))
);

beforeAll(() => server.listen());

beforeEach(() => {
  render(
    <Form method="POST" action="/commissions">
      <input type="text"></input>
      <button>Submit</button>
    </Form>
  );
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("smoke tests", () => {
  test("renders child props", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("tests in a successful state", () => {
  test("displays successful response", async () => {
    userEvent.type(screen.getByRole("textbox"), "My Cool Name");
    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Form submitted")).toBeInTheDocument());
  });

  test("hides the form on submit", async () => {  
    const inputTextbox = screen.getByRole("textbox");
    const submitButton = screen.getByText("Submit");
  
    userEvent.type(inputTextbox, "My Cool Name");
    userEvent.click(submitButton);
  
    expect(inputTextbox).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
    
    await screen.findByText("Form submitted");
  });

  test("does not display a reset button after a successful submission", async () => {
    const inputTextbox = screen.getByRole("textbox");
    const submitButton = screen.getByText("Submit");
  
    userEvent.type(inputTextbox, "My Cool Name");
    userEvent.click(submitButton);
  
    await screen.findByText("Form submitted");
    const resetButton = screen.queryByText("Reset");
  
    expect(resetButton).not.toBeInTheDocument();
  });
});

describe("tests in a failure state", () => {
  beforeEach(() => {
    server.use(
      rest.post("/commissions", (req, res, ctx) => res(ctx.status(500)))
    );
  })

  test("displays an error when status is not 200", async () => {  
    userEvent.type(screen.getByRole("textbox"), "My Cool Name");
    userEvent.click(screen.getByText("Submit"));
  
    await waitFor(() =>
      expect(screen.getByText("Form did not submit")).toBeInTheDocument()
    );
  });

  test("displays a reset button after an error", async () => {
    const inputTextbox = screen.getByRole("textbox");
    const submitButton = screen.getByText("Submit");
  
    userEvent.type(inputTextbox, "My Cool Name");
    userEvent.click(submitButton);
  
    const resetButton = await screen.findByText("Reset");
  
    expect(resetButton).toBeInTheDocument();
  });

  test("returns the form to initial state when reset button pressed", async () => {  
    let inputTextbox = screen.getByRole("textbox");
    let submitButton = screen.getByText("Submit");
  
    userEvent.type(inputTextbox, "My Cool Name");
    userEvent.click(submitButton);
  
    const resetButton = await screen.findByText("Reset");
  
    userEvent.click(resetButton);
  
    inputTextbox = await screen.findByRole("textbox");
    submitButton = await screen.findByText("Submit");
    
    expect(inputTextbox).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(resetButton).not.toBeInTheDocument();
  });
})