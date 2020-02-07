import React from 'react'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'

const SemanticInput = (field) => {
  const {
    label = '',
    required = false,
    placeholder,
    meta: { touched, visited, invalid },
    ...restInput
  } = field

  return (
    <FormWrapper required={required}>
      {
        label !== '' && (
          <Label>{label}</Label>
        )
      }
      <CustomInput
        {...field.input}
        {...restInput}
        error={touched && visited && invalid}
        placeholder={placeholder}
      />
    </FormWrapper>
  )
}

export default SemanticInput

// language=SCSS prefix=&{ suffix=}
const FormWrapper = styled(Form.Field)`
    display: flex;
    justify-content: center;
    align-self: center;
    width: 100%;
    position: relative;
`
// language=SCSS prefix=&{ suffix=}
const Label = styled.label`
    width: 20%;
    display: flex !important;
    justify-content: flex-end !important;
    align-items: center !important;
    margin: 0px 20px 0px 0px !important;
    text-align: right;

    @media (max-width: 700px) {
      width: fit-content;
      position: absolute;
      left: 10%;
      top: -25px;
    }
`
const CustomInput = styled(Form.Input)`
  display: flex;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  font-family: Sarabun !important;
  font-size: 14px !important;

  .ui input {
    height: 38px;
    background-color: #EBEBEB !important;
    border: 1px solid rgba(148, 148, 148, 0.5) !important;
    box-sizing: border-box;
    border-radius: 28px !important;
  
    :disabled {
      background-color: #f5f6f7 !important;
      color: #929598 !important;
    }
  }

  .ui.disabled.input {
    opacity: 1;
  }
`
