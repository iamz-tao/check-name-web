import App, { Container } from 'next/app'
import React from 'react'
import { compose } from 'redux'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import styled, { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import withIntl from '~/helpers/withIntl'

import { DefaultTheme as ThemeProvider } from '~/hocs/ThemeProvider'
import { textRegular, textHeader } from '~/styles/constant'
import '~/helpers/utils'

import createStore from '~/store'

const GlobalStyle = createGlobalStyle`
  textarea {
    resize: none !important;
  }
`

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <ThemeProvider>
            <Wrapper>
              <Head>
                <link
                  rel='stylesheet'
                  href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.17.0/antd.min.css'
                />
              </Head>
              <GlobalStyle />
              <Component {...pageProps} />
            </Wrapper>
          </ThemeProvider>
        </Provider>
      </Container>
    )
  }
}

export default compose(
  withReduxSaga,
  withRedux(createStore),
  withIntl,
)(CustomApp)

const Wrapper = styled.div`
  body {
    -webkit-font-smoothing: antialiased;
    font-family: ${textRegular};
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, .ui.header {
    -webkit-font-smoothing: antialiased;
    font-family: ${textHeader};
    font-weight: 500;
  }

  :focus {
    outline: none !important;
  }

  @font-face {
    font-family: 'Kanit';
    src: url('/static/fonts/Kanit-Regular.ttf');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Kanit';
    src: url('/static/fonts/Kanit-Medium.ttf');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Kanit';
    src: url('/static/fonts/Kanit-SemiBold.ttf');
    font-weight: 600;
  }

  @font-face {
    font-family: 'Sarabun';
    src: url('/static/fonts/Sarabun-Regular.ttf');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Sarabun';
    src: url('/static/fonts/Sarabun-Medium.ttf');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Sarabun';
    src: url('/static/fonts/Sarabun-SemiBold.ttf');
    font-weight: 600;
  }
`
