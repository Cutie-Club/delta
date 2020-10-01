const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mailer = require("./mailer.js");

const upload = multer();
const app = express();

const port = 3001;

app.use(cors());

app.get("/test", (req, res) => {
  res.status(200).send("Hello World");
})

app.post("/commissions", upload.none(), (req, res) => {
  if (!req.body) return res.status(400).end();

  mailer.sendEmail(req.body).then(() => {
    res.status(200).end();
  }).catch(() => {
    return res.status(400).end();
  });
});

const server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});

module.exports = {
  app: app,
  server: server
};
