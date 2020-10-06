const mjmlTemplate = (data) => `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>

        <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">${data.name || "Someone"} just filled out the form.</mj-text>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`

const textTemplate = (data) => `${data.name || "Someone"} just filled out the form.`

module.exports = (data) => {
  return {
    mjml: mjmlTemplate(data),
    text: textTemplate(data),
    subject: `[COMMISSION] Request from ${data.name}`,
    from: data.email,
    to: `enquiries@cutieclub.cc`
  };
}