import React from 'react'
import styled from 'styled-components'
import { fromJS } from 'immutable'
import {
  Form,
  Dropdown as SemanticDropdown,
} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

const DropdownWithLabel = (props) => {
  const {
    fields,
    label,
    required,
    options,
    multiple,
    search,
    placeholder,
    isFeature,
  } = props
  const defaultValue = fields.getAll() || fromJS([])
  return (
    <FormWrapper required={required}>
      {
        label && (
          <Label>{label}</Label>
        )
      }
      <CustomDropdown
        selection
        isFeature={isFeature}
        value={defaultValue.toJS()}
        multiple={multiple}
        search={search}
        placeholder={placeholder}
        options={options}
        onChange={(e, { value }) => {
          fields.removeAll()
          value.forEach(v => fields.push(v))
        }}
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

  .ui.disabled.dropdown,
  .ui.dropdown .menu>.disabled.item {
    background: #f5f6f7 !important;
    color: #929598 !important;
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
  //width: 380px !important;
  width: ${props => (props.isFeature ? '100% !important' : '380px')};

  min-height: 32px !important;
  max-height: ${props => (!props.multiple ? '32px !important' : 'fit-content')};
  padding: ${props => (!props.multiple ? '6px 10px 6px 10px !important' : '')};

  font-family: Sarabun !important;
  font-size: 14px !important;
  .dropdown.icon {
    padding: ${props => (!props.multiple ? '6px 10px 6px 10px !important' : '')};
  }
  
  .ui.label {
    background-color: #FF5A5F !important;
    color: white;
  }
  @media (max-width: 700px) {
    //width: 80% !important;
    //margin: 5px 0px 15px 0px !important;
  }

  @media (max-width: 500px) {
    //width: 90% !important;
    //margin: 5px 0px 15px 0px !important;
  }
`
