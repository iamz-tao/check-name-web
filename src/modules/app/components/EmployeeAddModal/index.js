import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Form,
  Modal,
  Button,
} from 'semantic-ui-react'
import styled from 'styled-components'
import is from 'is_js'
import { FormattedMessage } from 'react-intl'

// import CustomRadio from '~/components/CustomRadio'

// language=SCSS prefix=&{ suffix=}
const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    @media (max-width: 500px) {
      flex-direction: row;
    }
`

// language=SCSS prefix=&{ suffix=}
const ModalFormFooter = styled.footer`
    display: flex;
    justify-content: center;
`

// language=SCSS prefix=&{ suffix=}
const CustomButton = styled.button`
  cursor: pointer;
  border: none;
  box-shadow: none;
  text-transform: uppercase;
  padding: 10px 40px;
  background-color: ${props => (props.disabled ? '#DADDE1' : '#F37021')};
  border-radius: 4px;
  color: #fff;
`

// language=SCSS prefix=&{ suffix=}
const ModalFormContainer = styled.div`
    background-color: white;
    color: black;
    flex-direction: column;
    display: flex;
    padding: 15px 0;
    .ui.grid>[class*="right aligned"].column.column {
      text-align: right;
      align-self: inherit;
      width: 60px !important;
      padding: 0 10px 0 0;
    }
    .ui.grid>[class*="ten wide"].column {
      width: 100%;
      flex: 1;
      padding-left: 0px;
      padding-right: 0px;
    }
    .ui.fluid.input {
      display: flex;
      height: 32px;
    }
    .ui.grid {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: stretch;
      padding: 0;
    }
    @media (max-width: 500px) {
      .ui.grid {
        display: grid;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: stretch;
        padding: 0;
        width: 100% !important;
    }
    .ui.grid>[class*="right aligned"].column.column {
      text-align: left;
      padding-top: 10px;
      padding-bottom: 5px;
    }
    .ui.grid>[class*="ten wide"].column {
      width: 100% !important;
      padding: 0 0 10px 0;
    }
  }
    
`

// language=SCSS prefix=&{ suffix=}
const HeaderText = styled.span`
    font-size: 1.5rem;
    font-weight: 500;
`

// language=SCSS prefix=&{ suffix=}
const ModalFomHeader = styled.section`
    display: flex;
    justify-content: center;

`

// language=SCSS prefix=&{ suffix=}
const ModalFomBody = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonGroup = styled(Button)`
  background-color: ${props => (props.active ? '#FF5A5F' : '#F5F6F7')} !important;
  color: ${props => (props.active ? '#fff' : '#231F20')} !important;

`
const CustomModal = styled(Modal)`
  i.close.icon {
    color: rgba(157, 157, 157, 0.85) !important;
    top: 1.5rem !important;
  }
`

// const options = [
//   {
//     label: 'staff',
//     value: 'V',
//   },
//   {
//     label: 'admin',
//     value: 'VA',
//   },
// ]

const Field = (props) => {
  const {
    label,
    ...restInput
  } = props
  return (
    <Grid container>
      <Grid.Column
        width={4}
        textAlign='right'
        verticalAlign='middle'
      >
        <span>
          {label}
        </span>
      </Grid.Column>

      <Grid.Column width={10}>
        <Form.Input
          fluid
          {...restInput}
        />
      </Grid.Column>
    </Grid>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
}

class EmployeeAddModal extends Component {
  state = {
    emp_email: '',
    role: 'V',
    invalid: true,
  }

  handleInputChange = (e) => {
    const { target } = e
    const { name, value } = target
    if (is.email(value)) {
      this.setState({ invalid: false })
    } else {
      this.setState({ invalid: true })
    }
    this.setState({ [name]: value })
  }

  handleToggle = (role) => {
    this.setState({ role })
  }

  handleSubmitForm = (handleSubmit) => {
    this.setState({ emp_email: '' })
    handleSubmit({ ...this.state })
  }

  render() {
    const {
      open,
      handleClose,
      handleSubmit,
      emp_status,
      handleStatusChange,
    } = this.props

    const {
      emp_email,
      // role,
      invalid,
    } = this.state

    return (
      <CustomModal
        open={open}
        onClose={handleClose}
        basic
        size='small'
        closeIcon
      >
        <Modal.Content>
          <ModalFormContainer>
            <ModalFomHeader>
              <HeaderText>
                <FormattedMessage
                  id='create-employee'
                  defaultMessage='Create Employee'
                />
              </HeaderText>
            </ModalFomHeader>

            <ModalFomBody>
              <FieldGroup>
                <FormattedMessage
                  id='label-email'
                  defaultMessage='Email'
                >
                  {
              msg => (
                <Field
                  label={msg}
                  placeholder={msg}
                  name='emp_email'
                  value={emp_email}
                  onChange={this.handleInputChange}
                />
              )}
                </FormattedMessage>
              </FieldGroup>

              {/* <FieldGroup> */}
              {/* <Field */}
              {/* label='First Name' */}
              {/* placeholder='First Name' */}
              {/* name='first_name' */}
              {/* value={first_name} */}
              {/* onChange={this.handleInputChange} */}
              {/* /> */}
              {/* </FieldGroup> */}

              {/* <FieldGroup> */}
              {/* <Field */}
              {/* label='Last Name' */}
              {/* placeholder='Last Name' */}
              {/* name='last_name' */}
              {/* value={last_name} */}
              {/* onChange={this.handleInputChange} */}
              {/* /> */}
              {/* </FieldGroup> */}

              <FieldGroup>
                <Grid container>
                  <Grid.Column
                    width={4}
                    textAlign='right'
                    verticalAlign='middle'
                  >
                    <span>
                      <FormattedMessage
                        id='Status'
                        defaultMessage='Status'
                      />
                    </span>
                  </Grid.Column>

                  <Grid.Column width={10}>
                    <Button.Group>
                      <ButtonGroup
                        onClick={() => handleStatusChange('V')}
                        active={emp_status === 'V'}
                      >
                        <FormattedMessage
                          id='User'
                          defaultMessage='User'
                        />
                      </ButtonGroup>
                      <ButtonGroup
                        onClick={() => handleStatusChange('VA')}
                        active={emp_status === 'VA'}
                      >
                        <FormattedMessage
                          id='Admin'
                          defaultMessage='Admin'
                        />
                      </ButtonGroup>
                    </Button.Group>
                  </Grid.Column>
                </Grid>
              </FieldGroup>

            </ModalFomBody>

            <ModalFormFooter>
              <CustomButton
                type='button'
                color='orange'
                onClick={() => this.handleSubmitForm(handleSubmit)}
                disabled={invalid}
              >
                <FormattedMessage
                  id='CREATE'
                  defaultMessage='CREATE'
                />
              </CustomButton>
            </ModalFormFooter>
          </ModalFormContainer>
        </Modal.Content>
      </CustomModal>
    )
  }
}

EmployeeAddModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default EmployeeAddModal
