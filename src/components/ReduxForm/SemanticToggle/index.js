import React from 'react'
import styled from 'styled-components'
import { Form, Checkbox } from 'semantic-ui-react'

const SemanticToggle = (field) => {
  const {
    label,
    required,
    // meta: { error, touched, visited },
    input,
    disabled,
    handleInput,
  } = field
  return (
    <FormWrapper required={required}>
      {
        label && (
          <Label>{label}</Label>
        )
      }
      <>
        <Checkbox
          {...input}
          value={input.value}
          toggle
          disabled={disabled}
          checked={input.value}
          onChange={(e, { name, value }) => handleInput(name, !value)}
        />
      </>
    </FormWrapper>
  )
}

export default SemanticToggle

// language=SCSS prefix=&{ suffix=}
const FormWrapper = styled(Form.Field)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    position: relative;
    height: 32px;

    @media (max-width: 640px) {

    }
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
const Wrapper = styled.div`
  //display: flex;
  //align-items: center;
  width: 380px;
  height: 32px;
`
