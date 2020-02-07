import React from 'react'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'

const TextArea = (field) => {
  const {
    label = '',
    ...restInput
  } = field
  return (
    <FormWrapper>
      {
        label !== '' && (
          <Label>{label}</Label>
        )
      }
      <CustomTextArea
        {...field.input}
        {...restInput}
        rows='3'
      />
    </FormWrapper>
  )
}

export default TextArea

const FormWrapper = styled(Form.Field)`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100%;
  position: relative;
`
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
export const CustomTextArea = styled(Form.TextArea)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 77px;
  border-radius: 4px;
  font-family: Sarabun !important;
  font-size: 14px !important;

  textarea {
    :disabled {
      background-color: #f5f6f7 !important;
      color: #929598 !important;
    }
  }
  
  //@media (max-width: 700px) {
  //  width: 80% !important;
  //  margin: 5px 0px 15px 0px !important;
  //}

  //@media (max-width: 500px) {
  //  width: 90% !important;
  //  margin: 5px 0px 15px 0px !important;
  //}
`
