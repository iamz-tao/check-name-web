import React from 'react'
import styled from 'styled-components'
import { Button as SemanticButton } from 'semantic-ui-react'

const Button = (field) => {
  const {
    label,
    buttonValue,
    type,
    input,
    handleInput,
  } = field

  const value = buttonValue || label.toLowerCase()
  return (
    <CustomButton
      {...field.input}
      onClick={() => handleInput(type, value)}
      active={input.value === value}
      type='reset'
    >
      {label}
    </CustomButton>
  )
}

export default Button

const CustomButton = styled(SemanticButton)`
  background: ${props => (props.active ? '#FF5A5F' : '')} !important;
  color: ${props => (props.active ? 'white' : '')} !important;
  font-family: Sarabun !important;
  font-size: 14px !important;
`
