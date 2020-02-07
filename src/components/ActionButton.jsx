import styled, { css } from 'styled-components'

import Box from '~/components/css/Box'

/** @param {{ invert?: boolean }} props  */
const invertStyles = props => props.invert
  && css`
    color: white;
    background-color: #f37021;
  `
// text-align: ${props => (props.right ? 'right' : 'left')};

const ActionButton = styled(Box)`
  //width: 262px;
  //height: 70px;
  
  width: ${props => (props.isPlanner ? '190px' : '262px')};
  height: ${props => (props.isPlanner ? '50px' : '70px')};


  cursor: pointer;
  user-select: none;

  display: grid;
  place-items: center;

  color: #f37021;
  font-family: 'Kanit';
  font-weight: 500; /* medium */
  font-size: 22px;
  line-height: 33px;
  text-align: center;

  background-color: white;
  border: 1px solid #f37021;

  ${invertStyles}
`

export default ActionButton
