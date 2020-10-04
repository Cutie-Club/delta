const mjmlTranslator = require('../mjmlTranslator');
const mjml2html = require('mjml');
jest.mock("mjml");

mjml2html.mockReturnValue({ html: "", json: {}, errors: [] });

describe("", () => {
  test("calls mjml2html with minify: true", () => {
    mjmlTranslator(`
      <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
    
            <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>
    
            <mj-divider border-color="#F45E43"></mj-divider>
    
            <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello World</mj-text>
    
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `);

    expect(mjml2html).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ "minify": true }));
  })
})