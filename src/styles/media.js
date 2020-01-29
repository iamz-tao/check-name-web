// eslint-disable-next-line import/no-unresolved
import { css } from 'styled-components'

/**
 * @param {number} breakpoint trigger styles when `vw < breakpoint`
 * @return {typeof css}
 */
function media(breakpoint) {
  return (arg1, ...args) => css`
    @media (max-width: ${breakpoint / 16}em) {
      ${css(arg1, ...args)}
    }
  `
}

export default media
