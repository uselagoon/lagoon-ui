// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
// ./pages/_document.js
import getConfig from 'next/config';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
// styled-components
import { ServerStyleSheet } from 'styled-components';

import Plugins from '../components/Plugins/components/Plugins';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderpage = ctx.renderPage;
    const cache = createCache();

    try {
      ctx.renderPage = () =>
        originalRenderpage({
          enhanceApp: App => props =>
            sheet.collectStyles(
              <StyleProvider cache={cache}>
                <App {...props} />
              </StyleProvider>
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      const antdStyle = extractStyle(cache, true);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <style dangerouslySetInnerHTML={{ __html: antdStyle }} />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { publicRuntimeConfig } = getConfig();

    return (
      <Html>
        <Head>
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
