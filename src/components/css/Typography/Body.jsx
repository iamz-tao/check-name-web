import styled from 'styled-components'

/** @param {{ weight?: '400' | '500' | '600' }} props */
const decideWeight = props => (props.weight ? props.weight : '400')

const Body = styled.span`
  font-family: 'Sarabun';
  font-weight: ${decideWeight};
  font-size: 16px;
  line-height: 20px;
  color: #231f20;
`

export default Body
