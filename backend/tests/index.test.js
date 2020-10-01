const request = require('supertest');
const express = require('express');
const { app, server } = require('../index.js');

afterAll(() => server.close());

test("returns 200 OK, \"Hello World\" on /test", (done) => {
  request(app)
    .get('/test')
    .expect(200, "Hello World")
    .end(done)
});

describe("tests on /commissions route", () => {

  const mailer = require("../mailer.js");
  jest.spyOn(mailer, "sendEmail");
  afterEach(() => mailer.sendEmail.mockClear());

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
      .field("mail", "meow@cats.com")
      .field("message", "meow")
      .expect(200)
      .end(done)
  });

  test("calls email sender when form data received", (done) => {
    request(app)
      .post('/commissions')
      .field("name", "Oscar")
      .field("mail", "meow@cats.com")
      .field("message", "meow")
      .expect(200)
      .expect(() => expect(mailer.sendEmail).toHaveBeenCalledTimes(1))
      .end(done)
  });

  test("waits for mail to send before completing request", (done) => {
    let emailSent = false;

    mailer.sendEmail.mockImplementation(() => new Promise((resolve, reject) => {
      setTimeout(() => {
        emailSent = true;
        resolve();
      }, 2000);
    }));

    request(app)
      .post('/commissions')
      .field("name", "Oscar")
      .field("mail", "meow@cats.com")
      .field("message", "meow")
      .expect(() => expect(emailSent).toBe(true))
      .end(done)
  });

});
