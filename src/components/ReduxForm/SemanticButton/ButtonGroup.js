import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form/immutable'
import {
  ButtonGroup as SemanticButtonGroup,
  Form,
} from 'semantic-ui-react'
import Button from './Button'

const ButtonGroup = (field) => {
  const {
    buttons,
    label,
    handleInput,
    isAdsInfo,
  } = field
  return (
    <FormWrapper isAdsInfo={isAdsInfo}>
      {
        label && (
          <Label isAdsInfo={isAdsInfo}>{label}</Label>
        )
      }
      <Group isAdsInfo={isAdsInfo}>
        <ButtonWrapper>
          {
            buttons.map(button => (
              <Field
                buttonValue={button.value}
                type={button.name}
                key={button.value}
                name={button.name}
                label={button.label}
                handleInput={handleInput}
                component={Button}
              />
            ))
          }
        </ButtonWrapper>
      </Group>
    </FormWrapper>
  )
}

export default ButtonGroup

const FormWrapper = styled(Form.Field)`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100%;
  position: relative;
  margin-top: ${props => (props.isAdsInfo ? '0px' : '16px')} !important;
  @media (max-width: 640px) {
    // margin-top: ${props => (props.isAdsInfo && '20px')} !important;
  }
`
const Label = styled.label`
  width: ${props => (props.isAdsInfo ? 'unset' : '20%')};
  min-width: ${props => (props.isAdsInfo && '177px')};
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  margin: ${props => (props.isAdsInfo ? '0px' : '0px 20px 0px 0px')} !important;
  text-align: right;
  padding-right: ${props => (props.isAdsInfo && '8px')};
  color: ${props => (props.isAdsInfo && 'rgba(0,0,0,0.65)')} !important;
  font-size: ${props => (props.isAdsInfo && '16px')} !important;

  @media (max-width: 700px) {
    width: ${props => (props.isAdsInfo ? '177px' : 'fit-content')};
    position:  ${props => (props.isAdsInfo ? 'unset' : 'absolute')};;
    left: ${props => (props.isAdsInfo ? '0%' : '10%')};
    top: -25px;
  }

  @media (max-width: 640px) {
    position: ${props => (props.isAdsInfo && 'absolute')} !important;
    justify-content: ${props => (props.isAdsInfo && 'flex-start')} !important;
  }
`
const ButtonWrapper = styled.div`
  width: fit-content;
`
const Group = styled(SemanticButtonGroup)`
  display: flex;
  width: ${props => (props.isAdsInfo ? '100%' : '380px')} !important;

  @media (max-width: 700px) {
    width: ${props => (props.isAdsInfo ? '100%' : '80%')} !important;
    margin:  ${props => (props.isAdsInfo ? '0px' : '5px 0px 15px 0px')} !important;
  }

  @media (max-width: 500px) {
    width: ${props => (props.isAdsInfo ? '100%' : '90%')} !important;
  }
`
