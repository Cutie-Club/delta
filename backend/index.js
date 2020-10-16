const express = require("express");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cors = require("cors");

const { translateEmail, sendEmail } = require("./mailer");
const clientConfirmation = require("./mailer/mailTemplates/clientConfirmation");
const internalConfirmation = require("./mailer/mailTemplates/internalConfirmation");

const upload = multer();
const app = express();

const port = 3001;

app.use(cors());

app.get("/test", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/commissions", upload.none(), [
  body('name')
    .trim()
    .escape()
    .notEmpty(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .notEmpty(),
  body('message')
    .trim()
    .stripLow(false)
    .escape()
    .notEmpty()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (Object.keys(req.body).length > 3) {
    return res.status(400).end();
  }

  try {
    // build internal commission email
    const internalEmail = translateEmail(internalConfirmation(req.body));
    // build client confirmation email
    const clientEmail = translateEmail(clientConfirmation(req.body));

    sendEmail(internalEmail).then(() => {
      sendEmail(clientEmail).then(() => {
        res.status(200).end();
      });
    }).catch(() => {
      res.status(500).end();
    });

  } catch {
    res.status(500).end();
  }
});

const server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});

module.exports = {
  app: app,
  server: server
};
