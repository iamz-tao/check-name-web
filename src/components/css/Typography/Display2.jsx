import styled, { css } from 'styled-components'

/** @param {{ trailingLine?: boolean }} props */
const withTrailingLine = props => props.trailingLine
  && css`
    &::after {
      content: '';
      display: block;
      flex: 1;
      height: 5px;
      margin-left: 48px;
      background-color: #d4d4d4;
      border-radius: 4px;
      position: relative;
      top: 2px;
    }
  `

const Display2 = styled.h2`
  && {
    margin-bottom: 0;
    display: flex;
    align-items: center;

    font-family: 'Sarabun';
    font-weight: 600; /* semibold */
    font-size: 32px;
    line-height: 41px;
    color: #231f20;

    ${withTrailingLine}
  }
`

export default Display2
