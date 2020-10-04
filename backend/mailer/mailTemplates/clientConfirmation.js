module.exports = (data) => `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>

        <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello ${data.name}</mj-text>

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`