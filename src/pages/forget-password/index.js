import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  Button,
  Form,
  Grid,
  Message,
} from 'semantic-ui-react'
import get from 'lodash/get'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import is from 'is_js'
import Router from 'next/router'
import { Modal } from 'antd'

import withIntl from '~/helpers/withIntl'

import { forgetPasswordAction } from '~/modules/authentication/actions'
import { forgetPasswordSelector } from '~/modules/authentication/selectors'

import * as modalAction from '~/modules/modal/actions'
import LoadingPulse from '~/components/LoadingPulse'


class SetPassword extends Component {
  state = {
    email: '',
    open: false,
  }

  handleSubmit = () => {
    const { forgetPassword } = this.props
    const { email } = this.state
    forgetPassword({
      email,
    })

    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const { email, open } = this.state
    const { getAuthenticationForgetPasswordState } = this.props

    if (get(getAuthenticationForgetPasswordState, 'isFetching')) {
      return (<LoadingPulse />)
    }


    return (
      <Wrapper>
        <Box height={62} />
        <FormItem>
          <CustomerFormWrapper>
            <CardInfo>
              <CardHeader>
                <CardHeaderLeft>
                  <CardTitle>
                  RETRIEVE PASSWORD
                  </CardTitle>
                </CardHeaderLeft>
                <CardHeaderRight />
              </CardHeader>
              <SubtitleRow>
                Enter your email address and we’ll send you a link to reset your password.
              </SubtitleRow>
              <StyledForm
                onSubmit={this.handleSubmit}
                error
              >
                <SetPasswordRow>
                  <FloatLeft
                    width={5}
                    textAlign='right'
                  >
                  Email
                  </FloatLeft>
                  <StyledColumn>
                    <Form.Input
                      name='email'
                      onChange={({ target: { name, value } }) => this.setState({ [name]: value })}
                    />
                    {
                      email !== '' && !is.email(email) && (
                        <Message
                          error
                          header='Could you check something!'
                          content='Email Address in invalid format.'
                        />
                      )
                    }

                  </StyledColumn>
                </SetPasswordRow>
                <StyledButton>
                  <SubmitButton
                    disabled={is.email(email) === false}
                    type='submit'
                  >
                    SUBMIT
                  </SubmitButton>
                </StyledButton>
              </StyledForm>
            </CardInfo>
          </CustomerFormWrapper>
          <Modal
            visible={open}
            width={620}
            title='Reset Password'
            onCancel={this.handleClose}
            footer={[
              <Button key='back' onClick={() => Router.push('/login')}>
              BACK TO LOGIN
              </Button>,
            ]}
          >
            <div>
             We’ve sent reset password link to
            email
        please check your email before proceeding to the next step.
            </div>
          </Modal>
        </FormItem>
      </Wrapper>
    )
  }
}


SetPassword.propTypes = {
  getAuthenticationForgetPasswordState: PropTypes.instanceOf(Object).isRequired,
  forgetPassword: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => createStructuredSelector({
  getAuthenticationForgetPasswordState: forgetPasswordSelector.getAuthenticationForgetPasswordState,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  forgetPassword: forgetPasswordAction.forgetPassword,
  clearForgetPassword: forgetPasswordAction.clearForgetPassword,
  setModal: modalAction.setModal,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntl,
  // withLayout,
)(SetPassword)


// language=SCSS prefix=&{ suffix=}
const Wrapper = styled.div`
    display: block;
    position: relative;
    min-height: 80vh;

    .ui.form .field .ui.input input, .ui.form .fields .field .ui.input input {
      width: auto;
      height: 38px;
      border-radius: 21px;
    }

    .ui.form.error .error.message:not(:empty) {
      display: block;
      text-align: center;
    }

    .ui.form .field:last-child, .ui.form .fields:last-child .field {
      margin-bottom: 0;
      width: 100%;
    }
`
const FormItem = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
    height: 100%;
`

// language=SCSS prefix=&{ suffix=}
const SubmitButton = styled(Button)`
    color: #fff !important;
    background: #CA5353 !important;
    margin: 0 !important;
    padding-top: 15px !important;
    padding-bottom: 15px !important;
    width: 50%;
    text-transform: uppercase;
    font-family: Kanit;
    border-radius: 2.285714rem !important;
    width: 10em;
`

const SetPasswordRow = styled(Grid.Row)`
  display: inline-flex;
  background-color: white;
  padding: 10px 20px !important;
  border-radius: 4px;
  width: 100%;

  @media (max-width: 425px){
    flex-flow: column;
  }
  
`
const StyledColumn = styled(Grid.Column)`
  width: 100%;
`
const StyledForm = styled(Form)`
  flex: 1;
`
// language=SCSS prefix=&{ suffix=}
const SubtitleRow = styled(Grid.Row)`
    padding: 20px !important;
    background-color: #fff;
    text-align: center;
`


const StyledButton = styled(Grid.Row)`
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 10px 35px 0px 35px !important;
  border-radius: 4px;
`

const Box = styled.div`
  width: 62px;
  height: 62px;
`

// language=SCSS prefix=&{ suffix=}
const CardInfo = styled.section`
    background: ${props => props.theme.colors.white};
    position: relative;
    padding-bottom: 20px;
    margin-bottom: 25px;
    border: 1px solid #E1E1E1;
    border-radius: 18px;
    box-shadow: rgba(119, 119, 119, 0.1) 0 3px 6px;
`

// language=SCSS prefix=&{ suffix=}
const CardTitle = styled.span`
`

// language=SCSS prefix=&{ suffix=}
const CardHeader = styled.header`
    display: flex;
    position: relative;
    height: 38px;
`

// language=SCSS prefix=&{ suffix=}
const CardHeaderLeft = styled.div`
    display: flex;
    flex: 1;
    background: #CA5353;
    position: absolute;
    top: 0;
    left: 20px;
    padding: 10px 30px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: white;
    font-size: .9em;
`

// language=SCSS prefix=&{ suffix=}
const CardHeaderRight = styled.div`
    display: flex;
    flex: 1;
    position: absolute;
    top: 0;
    right: 20px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    color: white;
    font-size: .9em;
`

// language=SCSS prefix=&{ suffix=}
const CustomerFormWrapper = styled.div`
    margin-top: 10px;
    padding: 0 10px;
    position: absolute;
    max-width: 600px;
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
`

// language=SCSS prefix=&{ suffix=}
const FloatLeft = styled.section`
    padding-right: 10px;
    line-height: 32px;
    width: 52px;
    text-align: right;
    @media (max-width: 425px) {
      text-align: start;
    }
`
