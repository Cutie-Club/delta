const request = require('supertest');
const express = require('express');
const { app, server } = require('../index.js');

const mailer = require("../mailer");
jest.mock("../mailer");
mailer.sendEmail.mockResolvedValue();
afterEach(() => mailer.sendEmail.mockClear());

afterAll(() => server.close());

test("returns 200 OK, \"Hello World\" on /test", (done) => {
  request(app)
    .get('/test')
    .expect(200, "Hello World")
    .end(done)
});

describe("tests on /commissions route", () => {
  test("returns 400 Bad Request when no data is received", (done) => {
    request(app)
      .post('/commissions')
      .expect(400)
      .end(done)
  });

  test("returns 200 OK when form data received", (done) => {
    request(app)
      .post('/commissions')
      .field("name", "Oscar")
      .field("email", "meow@cats.com")
      .field("message", "meow")
      .expect(200)
      .end(done)
  });

  test("calls email sender twice when form data received", (done) => {
    request(app)
      .post('/commissions')
      .field("name", "Oscar")
      .field("email", "meow@cats.com")
      .field("message", "meow")
      .expect(200)
      .expect(() => expect(mailer.sendEmail).toHaveBeenCalledTimes(2))
      .end(done)
  });

  test("waits for mail to send before completing request", (done) => {
    let emailSent = false;

    mailer.sendEmail.mockImplementation(() => new Promise((resolve, reject) => {
      setTimeout(() => {
        emailSent = true;
        resolve();
      }, 1000);
    }));

    request(app)
      .post('/commissions')
      .field("name", "Oscar")
      .field("email", "meow@cats.com")
      .field("message", "meow")
      .expect(() => expect(emailSent).toBe(true))
      .end(done)
  });

  function checkBasicValidation(route, testCases) {
    testCases.forEach(testParams => {
      test(testParams.testName, (done) => {
        const req = request(app).post(route);
        Object.entries(testParams).forEach(([key, value]) => {
          if (key !== testParams.testName) req.field(key, value);
        });
        req.expect(400).end(done);
      })
    })
  }

  describe("form validation tests", () => {
    const nameFieldTests = [
      {
        testName: "name field is not supplied",
        email: "meow@cats.com",
        message: "meow"
      },
      {
        testName: "name field is not an empty string",
        name: "",
        email: "meow@cats.com",
        message: "meow"
      },
      {
        testName: "name field is not a whitespace string",
        name: "          ",
        email: "meow@cats.com",
        message: "meow"
      }
    ];
    checkBasicValidation("/commissions", nameFieldTests);

    const emailFieldTests = [
      {
        testName: "email field is not supplied",
        name: "Oscar",
        message: "meow"
      },
      {
        testName: "email field is not an empty string",
        name: "Oscar",
        email: "",
        message: "meow"
      },
      {
        testName: "email field is not an empty string",
        name: "Oscar",
        email: "          ",
        message: "meow"
      },
      {
        testName: "email field is not a regular string",
        name: "Oscar",
        email: "NotAnEmail",
        message: "meow"
      }
    ]
    checkBasicValidation("/commissions", emailFieldTests);

    const messageFieldTests = [
      {
        testName: "message field is not supplied",
        name: "Oscar",
        email: "meow@cats.com",
      },
      {
        testName: "message field is not an empty string",
        name: "Oscar",
        email: "meow@cats.com",
        message: ""
      },
      {
        testName: "message field is not a whitespace string",
        name: "Oscar",
        email: "meow@cats.com",
        message: "          "
      }
    ]
    checkBasicValidation("/commissions", messageFieldTests);
    
    test("rejects with more than 3 fields", (done) => {
      request(app)
      .post('/commissions')
      .field("name", "Oscar")
      .field("email", "meow@cats.com")
      .field("message", "meow")
      .field("extraField", "illegalField")
      .expect(400)
      .end(done)
    })
  });
});
