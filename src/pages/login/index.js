import React, { Component } from 'react'
import {
  Header,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { reduxForm, Field } from 'redux-form/immutable'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'
import get from 'lodash/get'

import withIntl from '~/helpers/withIntl'
// import withLayout from '~/hocs/Layouts/withLayout'
import { loginAction } from '~/modules/authentication/actions'
import { loginSelector } from '~/modules/authentication/selectors'
import ErrorModal from '~/components/Modals/Error'
import FormButton from '~/components/Form/Button'
import LoadingPulse from '~/components/LoadingPulse'
import renderInput from '~/components/ReduxForm/Input'

import validate from './validate'

export const FORM_NAME = 'LOGIN_PAGE'

class LoginPage extends Component {
  static getDerivedStateFromProps(props) {
    const { getAuthenticationLoginState } = props

    // have error show modal
    if (getAuthenticationLoginState.status === 400) {
      return {
        errorMessage: getAuthenticationLoginState.errorMessage,
        login_modal_error: true,
      }
    }

    // Login Success redirect to home
    if (getAuthenticationLoginState.status === 200) {
      // Router.replace('/')
    }

    return {}
  }

  state = {
    email: '',
    password: '',
    login_modal_error: false,

  }

  componentDidMount() {
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleLogin = (values) => {
    const { loginWithUsername } = this.props

    loginWithUsername({
      data: {
        email: values.get('email'),
        password: values.get('password'),
      },
    })
  }

  handleCloseModal = () => {
    const { LoginCloseModal } = this.props
    LoginCloseModal()
    this.setState({ login_modal_error: false })
  }

  checkDisabled = () => {
    const {
      email,
      password,
    } = this.state

    return (
      email === ''
      || password === ''
    )
  }

  render() {
    const {
      getAuthenticationLoginState,
      pristine,
      submitting,
      valid,
      handleSubmit,
    } = this.props

    const {
      login_modal_error,
      errorMessage,
    } = this.state

    if (get(getAuthenticationLoginState, 'isFetching')) {
      return (<LoadingPulse />)
    }

    return (
      <form onSubmit={handleSubmit(this.handleLogin)}>
        <HomeWrapper>
          <Container>
            <FormWrapper>
              <HeaderWrapper>
                <FormHeader>
                  LOG-IN TO YOUR ACCOUNT
                </FormHeader>
              </HeaderWrapper>

              <BodyWrapper>
                <Field
                  label='EMAIL'
                  name='email'
                  component={renderInput}
                  type='text'
                  placeholder='Email'
                />
                <Field
                  label='PASSWORD'
                  name='password'
                  component={renderInput}
                  type='password'
                  placeholder='Password'
                />
                <ForgetLink href='/forget-password'>
                  Forgot password?
                </ForgetLink>

                <FormButton
                  type='cancel'
                  txtButton='CANCEL'
                  width='50%'
                  onClick={() => {
                    Router.replace('/home')
                  }}
                />
                   &nbsp; &nbsp;
                <FormButton
                  colorButton='#006765'
                  disabled={pristine || submitting }
                  type='submit'
                  txtButton='LOGIN'
                  width='50%'
                  onClick={() => {
                  }}
                />

              </BodyWrapper>
            </FormWrapper>
          </Container>
          <ErrorModal
            open={login_modal_error}
            content='Error'
            message={errorMessage}
            onClick={this.handleCloseModal}
            txtButton='Close'
          />
        </HomeWrapper>
      </form>
    )
  }
}


const mapStateToProps = (state, props) => createStructuredSelector({
  getAuthenticationLoginState: loginSelector.getAuthenticationLoginState,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  loginWithUsername: loginAction.loginWithUsername,
  LoginCloseModal: loginAction.LoginCloseModal,
  handleAlreadyLogin: loginAction.handleAlreadyLogin,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  validate,
  enableReinitialize: true,
})

// language=SCSS prefix=&{ suffix=}
const Container = styled.section`
    width: 100%;
    height: calc(100vh - 57px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntl,
  // withLayout,
  withForm,
)(LoginPage)

// language=SCSS prefix=&{ suffix=}
const FormWrapper = styled.section`
    max-width: 650px;
    position: absolute;
    top: auto;
    left: auto;
    width: 90%;
    height: 54% !important;
    display: flex;
    font-size: 1em;
    flex-direction: column;
    text-align: center;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #ECECEC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 41px;
`

// language=SCSS prefix=&{ suffix=}
const HeaderWrapper = styled.header`
`

// language=SCSS prefix=&{ suffix=}
const BodyWrapper = styled.div`
    width: 100%;
    margin: 20px 0px;
    height: fit-content;
`

// language=SCSS prefix=&{ suffix=}
const HomeWrapper = styled.div`
    display: block;
    position: relative;

    .rc-slider-handle {
      width: 30px;
      height: 30px;
      bottom: -8px;
      border: solid 2px #F37021;

      :focus {
        box-shadow: none;
      }
    }

    .rc-slider-track {
      background: #F37021;
    }
`

// language=SCSS prefix=&{ suffix=}
const FormHeader = styled(Header)`
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    text-align: center;
    margin-top:24px !important;
`

// language=SCSS prefix=&{ suffix=}
const ForgetLink = styled.a`
    color: #000;
    text-decoration: underline;
    position: absolute;
    right: 25%;
    margin-top: -25px;

    @media (max-width: 700px) {
      right: 11%;
    }

    @media (max-width: 500px) {
      right: 5%;
    }
`
