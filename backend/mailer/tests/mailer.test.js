const nodemailer = require('nodemailer');
const { sendEmail, buildEmail } = require('../');

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

describe("buildEmail", () => {
  const formData = {
    name: "A Name",
    email: "someone@domain.tld",
    message: "hello i want a commission ta"
  }

  const email = {
    to: "A Name <someone@domain.tld>",
    from: "enquiries@cutieclub.cc",
    subject: "Test Email",
    html: "<h1>Thanks for contacting us!</h1>",
    text: "We just got your message."
  }

  test("builds a confirmation email object from formData", () => {
    expect(buildEmail(formData)).toStrictEqual(email)
  })
})

// create some sort of email builder

// form is submitted
// form data is sent to backend
// backend sanitises formdata
// formdata is converted into 2 email objects
// a confirmation email is sent to form filler
// the form body email is sent internally