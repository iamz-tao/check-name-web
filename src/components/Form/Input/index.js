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
const Input = styled.input`
    width: 50% !important;
    height: 32px;
    border: 1px solid #DADDE1;
    border-radius: 4px;
    font-family: Kanit;
    @media (max-width: 700px) {
      width: 80% !important;
    }

    @media (max-width: 500px) {
      width: 90% !important;
    }
`

const FormInput = (props) => {
  const {
    label,
    ...restInput
  } = props

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        {...restInput}
      />
    </FormGroup>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormInput
