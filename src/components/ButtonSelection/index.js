import React from 'react'
import styled from 'styled-components'
import { Button, ButtonGroup as SemanticGroup } from 'semantic-ui-react'

const ButtonSelection = (props) => {
  const {
    choices,
    active,
    handleSelect,
  } = props

  return (
    <ButtonGroup>
      {
        choices.map(choice => (
          <CustomButton
            name={choice.toLowerCase()}
            onClick={() => handleSelect(choice.toLowerCase())}
            active={choice.toLowerCase() === active}
            key={choice}
          >
            {choice}
          </CustomButton>
        ))
      }
    </ButtonGroup>
  )
}

export default ButtonSelection

const ButtonGroup = styled(SemanticGroup)`
`

const CustomButton = styled(Button)`
  height: 35px !important;
  display: flex !important;
  justify-content: center !important;
  background-color: ${props => (props.active ? '#00A699' : '#F5F6F7')} !important;
  color: ${props => (props.active ? 'white' : '')} !important;
  flex: none !important;
`
