import React from 'react'
import isEmpty from 'lodash/isEmpty'
import {
  Form,
  Button as SButton,
  Dropdown as SDropdown,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown'

import business_type_data from '~/static/metadata/business_type.json'

// language=SCSS prefix=&{ suffix=}
const DropdownSpan = styled.span`
  color: ${props => (props.active ? 'grey' : 'black')};
  text-transform: capitalize;
`

const RoleDropdown = (props) => {
  const { text, onChange, role } = props

  return (
    <SDropdown text={text}>
      <SDropdown.Menu>
        <SDropdown.Item
          onClick={() => onChange('VA')}
        >
          <DropdownSpan
            active={(role === 'VA').toString()}
          >
            admin
          </DropdownSpan>
        </SDropdown.Item>

        <SDropdown.Item
          onClick={() => onChange('V')}
        >
          <DropdownSpan
            active={(role === 'V').toString()}
          >
            staff
          </DropdownSpan>
        </SDropdown.Item>
      </SDropdown.Menu>
    </SDropdown>
  )
}

RoleDropdown.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  role: PropTypes.string,
}

RoleDropdown.defaultProps = {
  text: '',
  role: '',
}

const Field = (props) => {
  const {
    label,
    isOptional,
    showButton,
    buttonColor,
    buttonText,
    options,
    isTextArea,
    isBizType,
    name,
    placeholder,
    onChange,
    isSelected,
    ...restInput
  } = props
  return (
    <FormGroup>
      <LabelWrapper>
        <span>
          {label}
          &nbsp;
          {isOptional && <Optional>(optional)</Optional>}
        </span>
      </LabelWrapper>

      { !isEmpty(options) ? (
        <SelectWrapper isBizType={isBizType}>
          { isBizType ? (
            <DropdownStyled
              name={name}
              onSelect={onChange}
              isSelected={isSelected}
            >
              <Dropdown.Toggle title={placeholder} />
              <Dropdown.Menu>
                { business_type_data.map(data => (
                  <MenuItem name={name} eventKey={data.value}>
                    {data.text}
                    {
                      get(data, 'child.length') > 0 && get(data, 'child').map(subdata => (
                        <MenuItem name={name} eventKey={subdata.value}>{subdata.text}</MenuItem>
                      ))
                    }
                  </MenuItem>
                ))
                }
              </Dropdown.Menu>
            </DropdownStyled>
          ) : (
            <Form.Select
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              options={options}
              {...restInput}
            />
          ) }
        </SelectWrapper>
      ) : (
        <InputWrapper showButton={showButton}>
          { isTextArea ? (
            <Form.TextArea
              rows='2'
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              {...restInput}
            />
          ) : (
            <Form.Input
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              {...restInput}
            />
          ) }
        </InputWrapper>
      ) }
      &nbsp;&nbsp;&nbsp;
      <ButtonWrapper showButton={showButton}>
        {
          showButton && (
            <SButton basic color={buttonColor}>
              <ButtonText>
                {buttonText}
              </ButtonText>
            </SButton>
          )
        }
      </ButtonWrapper>
    </FormGroup>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  isOptional: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  showButton: PropTypes.bool,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string,
  })),
  isTextArea: PropTypes.bool,
  isBizType: PropTypes.bool,
  onChange: PropTypes.func,
  isSelected: PropTypes.bool,
}

Field.defaultProps = {
  isOptional: false,
  type: 'text',
  placeholder: '',
  showButton: false,
  buttonColor: 'orange',
  buttonText: '',
  value: '',
  disabled: false,
  options: [],
  isTextArea: false,
  isBizType: false,
  onChange: {},
  isSelected: false,
  name: '',
}

export default Field

// language=SCSS prefix=&{ suffix=}
const FormGroup = styled.section`
    display: flex;
    text-align: right;
    align-items: center;
    margin: 15px 0;
`

// language=SCSS prefix=&{ suffix=}
const LabelWrapper = styled.header`
    flex: 2;
`

// language=SCSS prefix=&{ suffix=}
const InputWrapper = styled.section`
  flex: ${props => (props.showButton ? 3 : 4)};
  margin-left: 10px;

  .disabled.field {
    background-color: #F5F6F7;
    color: #929598;
  }
`

// language=SCSS prefix=&{ suffix=}
const SelectWrapper = styled.section`
  flex: 4;
  margin-left: 10px;

  .field {
    width: ${props => (props.isBizType ? '70%' : '100%')};
  }
`

// language=SCSS prefix=&{ suffix=}
const ButtonWrapper = styled.div`
    flex: ${props => (props.showButton ? 2 : 1)};
    text-align: left;
    .ui.button {
      padding: 12px 12.5px;
    }
`

// language=SCSS prefix=&{ suffix=}
const ButtonText = styled.span`
  text-transform: uppercase;
`

// language=SCSS prefix=&{ suffix=}
const Optional = styled.small`
    color: #FF5A5F;
    text-transform: capitalize;

`

// language=SCSS prefix=&{ suffix=}
const DropdownStyled = styled(Dropdown)`
  clear: both;
  width: 80%;
  float: left;

  > button {
    width: 100%;
    cursor: pointer;
    word-wrap: break-word;
    line-height: 1em;
    white-space: normal;
    outline: 0;
    -webkit-transform: rotateZ(0);
    transform: rotateZ(0);
    min-width: 14em;
    min-height: 2.71428571em;
    background: #fff;
    display: inline-block;
    padding: .78571429em 2.1em .78571429em 1em !important;
    color: ${props => (props.isSelected ? 'rgba(0,0,0,.87)' : 'rgba(191,191,191,.87)')} !important;
    box-shadow: none;
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
    transition: box-shadow .1s ease,width .1s ease;
  }

  > button span {
    float: right;
    cursor: pointer;
    position: absolute;
    width: auto;
    height: auto;
    line-height: 1.21428571em;
    top: 1.2em;
    right: 1em;
  }

  .dropdown---dropdown-menu---1fkH0 {
    width: 100%;
  }

  .dropdown---dropdown-submenu---11C1M .dropdown---dropdown-menu---1fkH0 {
    width: max-content;
  }
`
