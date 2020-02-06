import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  Button,
  Form,
  Grid,
} from 'semantic-ui-react'
import get from 'lodash/get'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Router from 'next/router'

import withLayout from '~/hocs/Layouts/withLayout'

import { setPasswordAction } from '~/modules/authentication/actions'
import { setPasswordSelector } from '~/modules/authentication/selectors'

// import ErrorModal from '~/components/Modals/Error'
// import SuccessModal from '~/components/Modals/Success'
import LoadingPulse from '~/components/LoadingPulse'

class SetPassword extends Component {
  static getDerivedStateFromProps(props) {
    const { getAuthenticationSetPasswordState } = props
    if (getAuthenticationSetPasswordState.isSuccessModal) {
      return {
        set_password_success: true,
      }
    }

    if (getAuthenticationSetPasswordState.isErrorModal) {
      return {
        errorMessage: getAuthenticationSetPasswordState.errorMessage.message,
        set_password_error: true,
      }
    }

    return {
      set_password_success: false,
      set_password_error: false,
      errorMessage: '',
    }
  }

  state = {
    email: '',
    password: '',
    confirm_password: '',
    errorMessage: '',
  }

  componentDidMount() {
    const { email } = Router.query
    this.setState({ email })
  }

  handleSubmit = () => {
    const { setPassword } = this.props
    const { token } = Router.query
    const { email, password, confirm_password } = this.state

    if (password !== confirm_password) {
      alert('Password not Match')
      return
    }

    const data = {
      email,
      password,
      confirm_token: token,
    }

    setPassword({ data })
  }

  handleRedirectToLogin = () => {
    window.location.href = '/login'
  }

  render() {
    const {
      email,
      password,
      confirm_password,
      set_password_success,
      set_password_error,
      errorMessage,
    } = this.state
    const {
      getAuthenticationSetPasswordState,
    } = this.props

    if (get(getAuthenticationSetPasswordState, 'isFetching')) {
      return (<LoadingPulse />)
    }

    return (
      <HomeWrapper>
        <Grid container>
          <HeaderRow>
            <TitleContainer>
              RESET PASSWORD
            </TitleContainer>
          </HeaderRow>
          <SetPasswordRow centered>
            <LabelColumn
              width={5}
              textAlign='right'
            >
              <Label>Email</Label>
              <Label>Password</Label>
              <Label>Confirm Password</Label>
            </LabelColumn>
            <Grid.Column width={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  name='email'
                  onChange={this.handleInputChange}
                  value={email}
                  disabled
                />

                <Form.Input
                  name='password'
                  type='password'
                  onChange={({ target: { name, value } }) => this.setState({ [name]: value })}
                />

                <Form.Input
                  name='confirm_password'
                  type='password'
                  onChange={({ target: { name, value } }) => this.setState({ [name]: value })}
                  error={confirm_password !== '' && password !== confirm_password}
                />

                <SubmitButton
                  disabled={(email === '' || password === '' || confirm_password === '' || password !== confirm_password)}
                  type='submit'
                >
                  CHANGE PASSWORD
                </SubmitButton>
              </Form>
            </Grid.Column>
            <Grid.Column width={5} />
          </SetPasswordRow>
        </Grid>

        {/* <SuccessModal
          content='Email verification'
          open={set_password_success}
          message={(
            <h3>
              We’ve sent verification code to
              <span>{` ${email}`}</span>
              <br />
              please check you email before proceeding to the next step
            </h3>
          )}
          onClick={this.handleRedirectToLogin}
          txtButton='Go to Login'
        />
        <ErrorModal
          content='Error'
          open={set_password_error}
          message={errorMessage}
          onClick={this.handleRedirectToLogin}
          txtButton='Go to Login'
        /> */}
      </HomeWrapper>
    )
  }
}

SetPassword.propTypes = {
  getAuthenticationSetPasswordState: PropTypes.instanceOf(Object).isRequired,
  setPassword: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => createStructuredSelector({
  getAuthenticationSetPasswordState: setPasswordSelector.getAuthenticationSetPasswordState,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  setPassword: setPasswordAction.setPassword,
  clearSetPassword: setPasswordAction.clearSetPassword,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(SetPassword)

// language=SCSS prefix=&{ suffix=}
const TitleContainer = styled.header`
    position: absolute;
    z-index: 999;
    padding: 10px;
    background-color: #03A699;
    margin-left: 20px;
    margin-top: 15px;
    color: #fff;
    font-family: Kanit;
    font-weight: bold;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`

const HomeWrapper = styled.div`
  display: block;
  position: relative;

  .rc-slider-handle{
    width: 30px;
    height: 30px;
    bottom: -8px;
    border: solid 2px #F37021;

    :focus{
      box-shadow: none;
    }
  }

  .rc-slider-track{
    background: #F37021;
  }
`

const HeaderRow = styled(Grid.Row)`
  margin: 30 0;
`
// language=SCSS prefix=&{ suffix=}

const SubmitButton = styled(Button)`
    color: #fff !important;
    background: #F37021 !important;
    margin: 40px 0 25px 0 !important;
    padding-top: 15px !important;
    padding-bottom: 15px !important;
    width: 100%;
    text-transform: uppercase;
    font-family: Kanit;
`

const SetPasswordRow = styled(Grid.Row)`
  background-color: white;
  padding: 46px 70px 46px 70px !important;
  border-radius: 4px;
  border: 1px solid #E1E1E1;
  box-shadow: rgba(119, 119, 119, 0.1) 0px 6px 12px;
  margin-bottom: 50px;
`

const LabelColumn = styled(Grid.Column)`
  padding-right: 0 !important;
  label {
    padding: .67857143em 0 .67857143em 1em;
    clear: both;
    margin: 0 0 1em !important;
    font-size: 1em !important;
    font-weight: normal !important;
    display: block;
  }
`
// language=SCSS prefix=&{ suffix=}
const Label = styled.label`
`
