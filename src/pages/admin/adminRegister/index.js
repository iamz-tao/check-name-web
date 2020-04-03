import React, { Component } from 'react'
import PropTypes from 'prop-types'
import is from 'is_js'
import {
  Grid,
  Form,
} from 'semantic-ui-react'
import { notification } from 'antd'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form/immutable'
import { bindActionCreators, compose } from 'redux'
import Router from 'next/router'

import get from 'lodash/get'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import validate from './validate'

import HeaderAdmin from '~/components/HeaderNavbar/Admin'
import Avatar from '~/components/UploadProfile'
import FormButton from '~/components/Form/Button'
import { registerSelector } from '~/modules/authentication/selectors'
import { registerAction } from '~/modules/authentication/actions'

import withLayout from '~/hocs/Layouts/withLayout'
import LoadingPulse from '~/components/LoadingPulse'
import renderInput from '~/components/ReduxForm/NomalInput'

const FORM_NAME = 'CREATE_ADMIN_ACCOUNT'

class RegisterPage extends Component {
  static getDerivedStateFromProps(props) {
    const { getAuthenticationRegisterState } = props
    if (getAuthenticationRegisterState.status === 200) {
      return {
        register_confirm_modal: true,
      }
    }

    if (getAuthenticationRegisterState.status === 400) {
      return {
        register_error_modal: true,
        errorMessage: getAuthenticationRegisterState.payload.message,
      }
    }

    return {}
  }


  componentDidMount() {
    const authToken = Cookie.get('token')
    const role = Cookie.get('role')
    if (!isNil(authToken) && role !== 'ADMIN') {
      Router.push('/profile')
    }
  }

  openNotificationRegisterSuccess = (type) => {
    notification[type]({
      message: 'Registration Successful!',
      description:
        'Check in user lists and then return to log in.',
    })
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleRegister = (values) => {
    const {
      email,
      password,
      professor_id,
      mobile_phone,
      name,
      surname,
    } = values.toJS()

    const { role } = this.state
    const { registerUser } = this.props

    registerUser({
      data: {
        email,
        password,
        id: professor_id,
        mobile: mobile_phone,
        firstname: name,
        lastname: surname,
        role,
      },
    })

    this.openNotificationRegisterSuccess('success')
  }

  render() {
    const {
      getAuthenticationRegisterState,
      pristine,
      submitting,
      reset,
      handleSubmit,
    } = this.props

    if (get(getAuthenticationRegisterState, 'isFetching')) {
      return (<LoadingPulse />)
    }
    return (
      <form onSubmit={handleSubmit(this.handleRegister)} style={{ display: 'contents' }}>
        <HeaderAdmin />
        <FormWrapper>
          <FormHeader>
            CREATE ADMIN ACCOUNT
          </FormHeader>
          <br />
          <Wrapper>
            {/* <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar icon='user' />
            </Grid> */}
            <StyleBorder
              container
              centered
            >

              <StyledForm>
                <Field
                  label='PERSONAL ID :'
                  name='professor_id'
                  component={renderInput}
                  type='text'
                  placeholder='Professor ID'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='NAME :'
                  name='name'
                  component={renderInput}
                  type='text'
                  placeholder='Name'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='SURNAME :'
                  name='surname'
                  component={renderInput}
                  type='text'
                  placeholder='Surname'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='EMAIL :'
                  name='email'
                  component={renderInput}
                  type='email'
                  placeholder='Email'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='PASSWORD :'
                  name='password'
                  component={renderInput}
                  type='password'
                  placeholder='Password'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='PHONE NUMBER :'
                  name='mobile_phone'
                  component={renderInput}
                  type='phone'
                  placeholder='Mobile Phone'
                />
              </StyledForm>
              <FormButton
                disabled={pristine || submitting}
                type='cancel'
                txtButton='CANCEL'
                width='50%'
                onClick={() => {
                  reset()
                  Router.replace('/admin')
                }}
              />
                  &nbsp; &nbsp;
              <FormButton
                disabled={submitting}
                colorButton='#006765'
                type='submit'
                txtButton='REGISTER'
                width='50%'
                onClick={() => {
                }}
              />
            </StyleBorder>
          </Wrapper>
        </FormWrapper>
      </form>
    )
  }
}

RegisterPage.propTypes = {
  getAuthenticationRegisterState: PropTypes.instanceOf(Object).isRequired,
  registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => createStructuredSelector({
  getAuthenticationRegisterState: registerSelector.getAuthenticationRegisterState,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUser: registerAction.registerUser,
  registerUserReset: registerAction.registerUserReset,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  validate,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
  withForm,
)(RegisterPage)

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 36px 90px 0px 90px;

  @media (max-width: 750px) {
    margin-top: 16px;
    margin-bottom: 16px;
  } 
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0px;
  max-width: 48vw;
  @media (max-width: 320px) {
    width: 325px;
  }

  .ui.grid {
    display: flex;
    flex: 1;
    justify-content: center;
    margin: 20px;
  }


  .ui.checkbox label, .ui.checkbox input:focus~label {
    color: #666666;
  }

  .ui.checkbox input:checked~label:before {
    background: #F37021;
  }

  .ui.checkbox input:checked~label:after {
    color: #FFF;
    font-size: 12px;
  }

  .ui.checkbox label {
    color: rgba(0,0,0,.87);
    transition: color .1s ease;
    padding-left: 22px;
    @media (max-width: 360px) {
      padding-left: 26px;
  }
  }

  .ui.centered.grid>.row {
    text-align: left;
  }

  .ui.form {
    width: 100%;
  }

  .ant-upload.ant-upload-select-picture-card {
    width: 300px;
    height: 300px;
  }

`

const FormHeader = styled.div`
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 30px !important;
    font-weight: 700 !important;
    justify-content: center;
    display: flex;
`

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0px;
  margin-left: 22px;
    margin-right: 22px;
  @media (max-width: 750px) {
    flex-direction: column;
  }
  
`

const StyleBorder = styled(Grid)`
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #ECECEC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 41px;
  background-color: #fff;
  background: linear-gradient(180deg,#FFFFFF 0%,rgba(255,255,255,0) 100%),#ECECEC;
`
