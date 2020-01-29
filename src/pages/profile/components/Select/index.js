import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// language=SCSS prefix=&{ suffix=}
const FormGroup = styled.div`
    justify-content: right;
    align-items: center;
    display: flex;
    padding: 10px 20px;
    text-align: end;

    @media screen and (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
    }
`

// language=SCSS prefix=&{ suffix=}
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

// language=SCSS prefix=&{ suffix=}
const Select = styled.select`
  padding: 0 10px !important;
  height: 32px !important;
  border: 1px solid ${props => (props.error ? 'red' : '#DADDE1')} !important;
  border-radius: 4px;
  font-family: Sarabun !important;
  font-size: 14px !important;

  :disabled {
    background-color: #f5f6f7 !important;
    color: #929598 !important;
  }
  
  line-height: 32px; 
  //font-size: .8em;
`

// language=SCSS prefix=&{ suffix=}
const ErrorMessage = styled.span`
    position: absolute;
    margin-left: 10px;
    line-height: 32px;
    
`

const FormSelect = (field) => {
  const {
    label,
    children,
    disabled = false,
    meta: { visited, touched, error },
  } = field
  return (
    <FormGroup>
      <Label>{ label }</Label>
      <Select
        {...field.input}
        disabled={disabled}
        error={touched && visited && error}
      >
        { children }
      </Select>
      { touched && visited && error && (<ErrorMessage>{error}</ErrorMessage>) }
    </FormGroup>
  )
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormSelect
