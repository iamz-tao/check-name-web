import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FormGroup = styled.div`
    justify-content: right;
    align-items: center;
    display: flex;
    padding: 10px 20px;
    text-align: end;
    font-family: Sarabun !important;
    font-size: 14px !important;
    font-weight: bold;
    color: ${props => props.theme.colors.formLabel} !important;


    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
    }
`

const Label = styled.label`
    width: 150px;
    margin-right: 5px;
    line-height: 32px;
    font-family: Sarabun !important;
    font-size: 14px !important;
    font-weight: bold;
    
    @media screen and (max-width: 500px) {
      align-self: end;
      width: auto;
    }
`

const Input = styled.input`
    height: 32px;
    border: 1px solid ${props => (props.error ? 'red' : '#DADDE1')} !important;
    border-radius: 4px;
    font-family: Sarabun !important;
    font-size: 14px !important;

    :disabled {
      background-color: #f5f6f7 !important;
      color: #929598 !important;
    }
`

const FormInput = (field) => {
  const {
    label,
    type = 'text',
    disabled = false,
    placeholder,
    name,
    meta: { visited, touched, error },
  } = field

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        {...field.input}
        disabled={disabled}
        type={type}
        name={name}
        error={touched && visited && error}
        placeholder={placeholder}
      />
    </FormGroup>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormInput
