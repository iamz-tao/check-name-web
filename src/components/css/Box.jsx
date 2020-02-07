import styled from 'styled-components'

/** @param {{ noshadow?: boolean }} props */
const boxShadow = props => (props.noshadow ? 'none' : '0 3px 6px rgba(119, 119, 119, 0.1)')

const Box = styled.div`
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  box-shadow: ${boxShadow};
`

export default Box
