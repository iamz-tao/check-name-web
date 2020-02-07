import React from 'react'
import styled from 'styled-components'
import { Button as SemanticButton } from 'semantic-ui-react'

/** @param {{ more?: boolean }} props */
const hasMoreStyles = props => (props.more ? '#00A699' : '#cccccc')

/**
 * https://react.semantic-ui.com/elements/button
 *
 * @param {import('semantic-ui-react').ButtonProps & { more?: boolean }} props
 */
const Button = ({ more, ...props }) => <SemanticButton circular {...props} />

const FloatButton = styled(Button)`
  &&& {
    width: 50px;
    height: 50px;
    margin: 0;
    padding: 0;

    background-color: ${hasMoreStyles};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 476px) {
      width: 10vw;
      height: 10vw;
    }
    i {
      font-size: 36px;
      color: #ffffff;

      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 476px) {
        font-size: 7vw;
    }
    }
  }
`

export default FloatButton
