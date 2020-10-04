const nodemailer = require("nodemailer");

let transporter = undefined;

async function init() {
  const testAccount = await nodemailer.createTestAccount();

  const transporterConfig = {
    "host": process.env.MAIL_HOST,
    "port": process.env.MAIL_PORT,
    "secure": true,
    "auth": {
      "user": process.env.MAIL_USER,
      "pass": process.env.MAIL_PASS
    }
  }

  transporter = nodemailer.createTransport(transporterConfig);
}

module.exports = {
  sendEmail: async (email) => {
    if (!transporter) await init();
    let info = await transporter.sendMail(email);
  },

  buildEmail: () => {}
}