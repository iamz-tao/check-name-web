import React from 'react'
import styled from 'styled-components'

import {
  Form,
  Dropdown as SemanticDropdown,
} from 'semantic-ui-react'

const DropdownWithLabel = (field) => {
  const {
    label,
    input,
    required,
    placeholder,
    options,
    handleInput,
    disabled = false,
    style,
  } = field

  return (
    <FormWrapper required={required}>
      {
        label && (
          <Label>{label}</Label>
        )
      }
      <CustomDropdown
        style={style}
        {...input}
        disabled={disabled}
        selection
        placeholder={placeholder}
        options={options}
        onChange={(e, { name, value }) => handleInput(name, value)}
      />
    </FormWrapper>
  )
}

export default DropdownWithLabel

const FormWrapper = styled(Form.Field)`
  display: flex;
  justify-content: center;
  align-self: center;
  width: 100%;
  position: relative;
  align-items: center;

  .ui.disabled.dropdown,
  .ui.dropdown .menu>.disabled.item {
    background: #f5f6f7 !important;
    color: #929598 !important;
  }
  .ui.selection.active.dropdown .menu {
    border-radius: 0px 0px 28px 28px;
}
  
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
const CustomDropdown = styled(SemanticDropdown)`
  display: flex;
  justify-content: center;
  /* width: ${props => (props.style ? '100%' : '380px')} !important; */
  width: 100%  !important;
  padding: ${props => (!props.multiple ? '6px 10px 6px 10px !important' : '')};
  font-family: Kanit !important;
  font-size: 14px !important;
  height: 38px;
  background-color: #EBEBEB !important;
  border: 1px solid rgba(148, 148, 148, 0.5) !important;
  box-sizing: border-box;
  border-radius: 28px !important;
  line-height: 1.8em !important;

  .dropdown.icon {
    padding: ${props => (!props.multiple ? '6px 10px 6px 10px !important' : '')};
    line-height: 24px !important;
  }

  .ui.dropdown>.text {
    display: flex;
    justify-content: baseline;
    line-height: 24px !important;
}

  @media (max-width: 700px) {
    width: ${props => (props.style ? '100%' : '80%')}!important;
  }

  @media (max-width: 500px) {
    width: ${props => (props.style ? '100%' : '90%')}!important;
  }
`
