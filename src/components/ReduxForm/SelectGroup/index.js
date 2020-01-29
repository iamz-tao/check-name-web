import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// language=SCSS prefix=&{ suffix=}
const FormGroup = styled.div`
    margin: 30px 0;
    position: relative;
`

// language=SCSS prefix=&{ suffix=}
const Label = styled.label`
    position: absolute;
    right: 76%;
    top: 6px;
    transition: .5s;

    @media (max-width: 700px) {
      width: auto;
      right: auto;
      top: -20px;
    }

    @media (max-width: 500px) {
      width: auto;
      left: 5%;
      top: -20px;
      right: auto;
    }
`

// language=SCSS prefix=&{ suffix=}
const Select = styled.select`
    padding: 0 1em !important;
    display: inline-flex !important;
    width: 50% !important;
    height: 32px !important;
    line-height: 32px;
    border: 1px solid ${props => (props.error ? 'red' : '#DADDE1')} !important;
    border-radius: 4px;
    font-family: Kanit;
    
    :disabled {
      background-color: #f5f6f7 !important;
      color: #929598 !important;
    }
    
    @media (max-width: 700px) {
      width: 80% !important;
    }

    @media (max-width: 500px) {
      width: 90% !important;
    }
`

// language=SCSS prefix=&{ suffix=}
const ErrorMessage = styled.span`
    position: absolute;
    margin-left: 10px;
    line-height: 32px;

`

const FormSelectGroup = (field) => {
  const {
    label,
    children,
    disabled = false,
    meta: { visited, touched, error },
  } = field

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Select
        {...field.input}
        disabled={disabled}
        error={touched && visited && error}
      >
        {children}
      </Select>
      {touched && visited && error && (<ErrorMessage>{error}</ErrorMessage>)}
    </FormGroup>
  )
}

FormSelectGroup.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormSelectGroup
