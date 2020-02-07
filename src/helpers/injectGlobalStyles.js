import { injectGlobal } from 'styled-components'
import { textRegular, textHeader } from '~/styles/constant'

export default injectGlobal`
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
