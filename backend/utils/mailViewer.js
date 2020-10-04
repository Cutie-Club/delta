const express = require("express");
const mjmlTranslator = require("../mailer/mjmlTranslator.js");

const app = express();

app.get("/:template", (req, res) => {
  try {
    const template = require(`${__dirname}/../mailer/mailTemplates/${req.params.template}`)
    res.status(200).send(mjmlTranslator(template(req.query)));
  } catch {
    res.status(404).send();
  }
})

const port = 3002;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
