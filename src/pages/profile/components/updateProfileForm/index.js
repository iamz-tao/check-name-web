import React from 'react'
import styled, { css } from 'styled-components'
import { Field } from 'redux-form/immutable'
import Cookie from 'js-cookie'

import {
  Grid,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'

import renderInput from '~/components/ReduxForm/NomalInput'

import Avatar from '~/components/UploadProfile'
import FormButton from '~/components/Form/Button'


const UpdateProfileForm = (props) => {
  const {
    submitting,
  } = props
  const userRole = Cookie.get('role')
  return (
    <FormWrapper>
      <br />
      <Wrapper role={userRole}>
      {/* {
          userRole !== 'ADMIN' && (
        <Grid style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <FormHeader>
            UPDATE PROFILE
          </FormHeader> */}
            {/* <Avatar /> */}
         {/* </Grid>
         )   
        } */}
        <StyleBorder
          container
          centered
        >
{/*{
  userRole === 'ADMIN' && ( */}
    <FormHeader>
            UPDATE PROFILE
          </FormHeader>
  {/* )
} */}
          <StyledForm>
            <Field
              label='PERSONNEL ID :'
              name='id'
              component={renderInput}
              type='text'
              placeholder='Personnel ID'
            />
          </StyledForm>
          <StyledForm>
            <Field
              label='NAME :'
              name='firstname'
              component={renderInput}
              type='text'
              placeholder='Name'
            />
          </StyledForm>
          <StyledForm>
            <Field
              label='SURNAME :'
              name='lastname'
              component={renderInput}
              type='text'
              placeholder='Surname'
            />
          </StyledForm>
          <StyledForm>
            <Field
              disabled
              label='EMAIL :'
              name='email'
              component={renderInput}
              type='email'
              placeholder='Email'
            />
          </StyledForm>
          <StyledForm>
            <Field
              label='MOBILE PHONE :'
              name='mobile'
              component={renderInput}
              type='phone'
              placeholder='Mobile Phone'
            />
          </StyledForm>
          <FormButton
            disabled={submitting}
            colorButton='#CA5353'
            type='submit'
            txtButton='UPDATE'
            width='50%'
            onClick={() => {
            }}
          />

        </StyleBorder>
      </Wrapper>
    </FormWrapper>
  )
}


UpdateProfileForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf(Map),
}

UpdateProfileForm.defaultProps = {
  profile: fromJS({}),
}

export default UpdateProfileForm


const FormWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 26px 148px 0px 90px;
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
max-width: 100%;
@media (max-width: 320px) {
width: 325px;
}

.ui.grid {
display: flex;
flex: 1;
justify-content: center;
margin: 20px;
margin-bottom: 36px;
max-width: 48vw !important;
/* ${props => props.role === 'ADMIN' && css `
  max-width: 48vw !important;
`
} */


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
padding-bottom: 21px;
`

const StyledForm = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin-bottom: 14px;
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
