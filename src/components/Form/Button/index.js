import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CustomButton = styled.button`
  width: ${props => (props.isFilter ? '96px' : '142px')} !important;
  background-color: ${props => (props.typeButton === 'cancel' ? '#E5E5E5' : props.colorButton)} !important;
  color: ${props => (props.typeButton === 'cancel' ? '#6f6f6f' : '#d6d2d2')} !important;
  margin: ${props => (props.margin ? props.margin : '25px 0 25px 0')} !important;
  padding: ${props => (props.isFilter && '8px 0px')} !important;
  height:  ${props => (props.isFilter ? '48px' : '56px')} !important;
  border-radius: 28px !important;
  font-size:  ${props => (props.isFilter ? '13px' : '16px')} !important;;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: normal;
  font-style: normal;
  font-family: kanit;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  :hover {
    opacity: 0.8;
    border-color: white;
    cursor: pointer;
  }
  
  @media (max-width: 700px) {
    width: 80% !important;
  }

  @media (max-width: 500px) {
    width: 90% !important;
  }
`

const Label = styled.label`
    text-transform: uppercase;
`

const Button = (props) => {
  const {
    isFilter,
    isRow,
    colorButton,
    onClick,
    txtButton,
    type,
    margin,
    disabled = false,
    ...restInput
  } = props

  return (
    <CustomButton
      disabled={disabled}
      isFilter={isFilter}
      isRow={isRow}
      colorButton={colorButton}
      typeButton={type}
      onClick={onClick}
      margin={margin}
      {...restInput}
    >
      <Label>{txtButton}</Label>
    </CustomButton>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  txtButton: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  width: PropTypes.string,
}

Button.defaultProps = {
  backgroundColor: '#F37021',
  color: '#fff',
  border: 'none',
  width: '100%',
}

export default Button
