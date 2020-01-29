import styled from 'styled-components'
import Body from './Body'

const Url = styled(Body).attrs({ as: 'a' })`
  color: #f37021;
  text-decoration: underline;
  transition: none;

  cursor: pointer;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`

export default Url
