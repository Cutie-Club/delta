const express = require("express");
const livereload = require('livereload');
const app = express();
const port = 3002;

const mjmlTranslator = require("../mailer/mjmlTranslator.js");
const mailerTemplatesDir = `${__dirname}/../mailer/mailTemplates`;

const liveReloadPort = 3003;
const server = livereload.createServer({ port: liveReloadPort });
server.watch(mailerTemplatesDir);

const reRequire = (moduleName) => {
  delete require.cache[require.resolve(moduleName)];
  return require(moduleName);
}

const injectLiveReload = (html) => {
  const injectable = `
  <script>
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':${liveReloadPort}/livereload.js?snipver=1"></' + 'script>')
  </script>`;
  return html.replace("<head>", `<head>${injectable}`);
}

app.get("/:template", (req, res) => {
  try {
    const mailTemplatePath = `${mailerTemplatesDir}/${req.params.template}`;
    const templateFunction = reRequire(mailTemplatePath);
    const emailHtml = mjmlTranslator(templateFunction(req.query).mjml);

    res.status(200).send(injectLiveReload(emailHtml));
  } catch {
    res.status(404).send();
  }
})

app.listen(port, () => {
  console.log(`running on port ${port}`);
});