const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const mailer = require('../');
const { sendEmail, translateEmail } = require('../');

jest.mock("nodemailer");

const fakeTransporter = {
  sendMail: jest.fn().mockResolvedValue()
}

nodemailer.createTransport.mockReturnValue(fakeTransporter);

beforeEach(() => {
  jest.resetModules();
  nodemailer.createTransport.mockClear();
  fakeTransporter.sendMail.mockClear();
})

describe("sendEmail", () => {
  const email = {
    to: "example@email.tld",
    from: "test@sender.com",
    subject: "Test Email",
    html: "<h1>This is a Test Email</h1>",
    text: "This is a Test Email"
  }

  test("initialises a transporter", async () => {
    await sendEmail(email);
    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
  });

  test("sends an email", async () => {
    await sendEmail(email);
    expect(fakeTransporter.sendMail).toHaveBeenCalledTimes(1);
  });

  test("sends an email with given mail object", async () => {
    await sendEmail(email);
    expect(fakeTransporter.sendMail).toHaveBeenCalledWith(email);
  })
});

const requiredFields = ['to', 'from', 'subject', 'text', 'html'];
const formData = {
  name: "Oscar",
  email: "noisy@meow.com",
  message: "MEOW MEOW MEOW!"
}

describe("translateEmail", () => {
  //inputs: mjmlEmail
  //output: htmlEmail
  const mjmlEmail = require("./testTemplate")(formData);
  const htmlEmail = translateEmail(mjmlEmail);

  test("results in an email object with the minimum required fields", () => {
    expect(htmlEmail).toContainKeys(requiredFields);
  });

  test("returns all non-mjml fields without transformation", () => {
    const clonedMJMLemail = { ...mjmlEmail };
    delete clonedMJMLemail.mjml;
    expect(htmlEmail).toMatchObject(clonedMJMLemail);
  });

  test("returns an object that does not contain an mjml field", () => {
    expect(htmlEmail).not.toContainKey('mjml');
  });

  test("does not mutate the given object", () => {
    const objectToTest = require("./testTemplate")(formData);
    const clonedObjectToTest = {...objectToTest};
    translateEmail(objectToTest);
    expect(objectToTest).toStrictEqual(clonedObjectToTest);
  })
});

describe("templates: does", () => {
  const mailTemplatesPath = `${__dirname}/../mailTemplates`;
  const mailTemplates = fs.readdirSync(mailTemplatesPath);

  for (const templateName of mailTemplates) {
    const template = require(`${mailTemplatesPath}/${templateName}`);
    const templateResult = translateEmail(template(formData));

    requiredFields.forEach((field) => {
      test(`${templateName} have '${field}' field`, () => {
        expect(templateResult[field]).toBeDefined();
        expect(templateResult[field]).not.toBeEmpty();
      });
    })
  }
});