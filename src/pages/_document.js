import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await super.getInitialProps(ctx)
    const {
      req,
      renderPage,
    } = ctx

    const {
      localeDataScript,
    } = req

    const { html, head, chunks } = renderPage()

    return {
      ...props,
      localeDataScript,
      html,
      head,
      chunks,
    }
  }

  render() {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    const helmet = Helmet.renderStatic()

    return (
      <html lang='en'>
        <Head>
          { helmet.meta.toComponent() }
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='icon' href='/static/images/favicon_mark8_white_fLG_icon.ico' type='image/ico' />
          <link rel='stylesheet' href='/static/css/lib.min.css' />
          <link rel='stylesheet' href='/static/css/semantic.min.css' />
          <link rel='stylesheet' type='text/css' charSet='UTF-8' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
          <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
          { styleTags }
        </Head>
        <body>
          { this.props.customValue }
          { main }
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
