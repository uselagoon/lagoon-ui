// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import Plugins from "../components/Plugins/components/Plugins";
// styled-components
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderpage = ctx.renderPage;

    try {
      ctx.renderPage = () => {
        originalRenderpage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      };
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/static/normalize.css" />
          <Plugins hook="head" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Plugins hook="body" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
