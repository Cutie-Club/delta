const mjml2html = require('mjml');

module.exports = (mjml, options) => {
  try {
    const mjmlResult = mjml2html(mjml, { minify: true, ...options })

    if (mjmlResult.errors.length > 0) throw new Error(mjmlResult.errors);

    return mjmlResult.html;
  } catch (err) {
    console.log(err);
  }
};