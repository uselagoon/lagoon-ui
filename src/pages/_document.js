// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Plugins from '../components/Plugins/components/Plugins'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <Plugins hook="head"/>  
        </Head>
        <body>
          <Main />
          <NextScript />
          <Plugins hook="body"/>
        </body>
      </Html>
    )
  }
}

export default MyDocument