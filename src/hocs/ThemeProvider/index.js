import React from 'react'
import { ThemeProvider } from 'styled-components'

const themeOptions = {
  colors: {
    primary: '#F37021',
    secondary: '#00A699',
    white: '#fefefe',
    whiteSmoke: '#bfbfc5',
    selected: '#FF5A5F',
    disabled: '#717581',
    request: '#AAAAAA',
    pending: '#D8524E',
    adsOn: '#0049BE',
    label: '#808285',
    accept: '#5CB85C',
    fieldDisable: '#E1E1E1',
    border: '#DADDE1',
    required: '#F37021',
    adminNavbar: '#4c4c4c',
    adminActive: '#111',
    default: '#01161E',
    waiting: '#F0AD4E',
    red: '#D90000',
    formLabel: 'rgb(89.25, 89.25, 89.25)',
  },
  space: [0, 6, 12, 18, 24],
  breakpoints: ['32em', '48em', '64em'],
}

export const DefaultTheme = ({ children }) => (
  <ThemeProvider theme={themeOptions}>{children}</ThemeProvider>
)

export default {
  DefaultTheme,
}
