import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Form,
} from 'semantic-ui-react'
import { notification, Upload, Button, Icon, Input } from 'antd'
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

import Avatar from '~/components/UploadProfile'
import FormButton from '~/components/Form/Button'
import { registerSelector } from '~/modules/authentication/selectors'
import { registerAction } from '~/modules/authentication/actions'

import LoadingPulse from '~/components/LoadingPulse'
import renderInput from '~/components/ReduxForm/NomalInput'

const FORM_NAME = 'CREATE_ACCOUNT'
const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  transformFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const canvas = document.createElement('canvas')
        const img = document.createElement('img')
        img.src = reader.result
        img.onload = () => {
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)
          ctx.fillStyle = 'red'
          ctx.textBaseline = 'middle'
          ctx.fillText('Ant Design', 20, 20)
          canvas.toBlob(resolve)
        }
      }
    })
  },
}

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

  state = {
    selectedFile: null,
    imagePreviewUrl: null,
  }

  componentDidMount() {
    const authToken = Cookie.get('token')
    if (!isNil(authToken)) {
      Router.push('/profile')
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  openNotificationRegisterSuccess = (type) => {
    notification[type]({
      message: 'Registration Successful!',
      description:
        'We will redirect to login page.',
    })
  }

  fileChangedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    })

    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result,
      })
    }

    reader.readAsDataURL(event.target.files[0])
  }

  submit = () => {
    const fd = new FormData()

    fd.append('file', this.state.selectedFile)

    const request = new XMLHttpRequest()

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        alert('Uploaded!')
      }
    }
    request.open('POST', 'https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', true)
    request.send(fd)
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
      handleSubmit,
    } = this.props

    let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>)
    if (this.state.imagePreviewUrl) {
      $imagePreview = (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src={this.state.imagePreviewUrl} alt='icon' width='300' />
          {' '}
        </div>
      )
    }

    if (get(getAuthenticationRegisterState, 'isFetching')) {
      return (<LoadingPulse />)
    }

    return (
      <form onSubmit={handleSubmit(this.handleRegister)} style={{ display: 'contents' }}>
        <FormWrapper>
          <FormHeader>
            CREATE YOUR ACCOUNT
          </FormHeader>
          <br />
          <Wrapper>
            <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <AppWrapper>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {/* <Upload {...props}>
                    <Button>
                      <Icon type='upload' onChange={this.fileChangedHandler}/>
                      <Input type='file' name='avatar' onChange={this.fileChangedHandler} />
                      {' '}
                      Upload
                    </Button>
                  </Upload> */}
                  <input type='file' name='avatar' onChange={this.fileChangedHandler} />
                  <button 
                    style={{
                      border: 'antiquewhite',
                      borderRadius: '18px',
                      width: '82px',
                      height: '33px',
                      cursor: 'pointer',
                    }}
                    type='button' 
                    onClick={this.submit}
                  > Upload </button>
                </div>

                { $imagePreview }
              </AppWrapper>
            </Grid>

            <StyleBorder
              container
              centered
            >

              <StyledForm>
                <Field
                  label='LECTURER ID :'
                  name='professor_id'
                  component={renderInput}
                  type='text'
                  placeholder='Lecturer ID'
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
                  label='PHONE NUMBER:'
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
                  Router.replace('/home')
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
  registerUserReset: PropTypes.func.isRequired,
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
  enableReinitialize: true,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
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

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
flex-direction: column;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0px;
  max-width: 100%;
  @media (max-width: 320px) {
    width: 325px;
  }

  .umg {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

const StyledLabel = styled.label`
  text-align: left;
  line-height: 32px;
  padding-right: 10px;
  width: 177px;
  font-family: kanit;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 750px) {
    text-align: left;
  }
`

const StyledInput = styled(Form.Input)`
  width: 100%;
  input {
    background: #f1f1f1 !important;
    mix-blend-mode: normal;
    border: 1px solid rgba(148, 148, 148, 0.5) !important;
    box-sizing: border-box;
    border-radius: 28px !important;
    height: 46px !important;
  }

`

const StyledStar = styled.span`
  color: red;
`

const FormInput = styled(Form)`
  width: 100%;
  display: flex;
`

const StyleBorder = styled(Grid)`
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #ECECEC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 41px;
  background-color: #fff;
  background: linear-gradient(180deg,#FFFFFF 0%,rgba(255,255,255,0) 100%),#ECECEC;
`
