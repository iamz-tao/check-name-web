import React, { Component } from 'react'
import Cookie from 'js-cookie'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import isNil from 'lodash/isNil'
import { Form } from 'semantic-ui-react'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Fields } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import { notification } from 'antd'

import withLayout from '~/hocs/Layouts/withLayout'
import { userAction } from '~/modules/user/actions'
import { userSelector } from '~/modules/user/selectors'

import LoadingPulse from '~/components/LoadingPulse'
import UpdateProfileForm from './components/updateProfileForm'
import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import HeaderAdmin from '~/components/HeaderNavbar/Admin'

import validate from './validate'

export const FORM_NAME = 'PROFILE_PAGE'


class ProfilePage extends Component {
  state = {
    isFetching: false,
  }

  componentDidMount() {
    const token = Cookie.get('token')
    if (isNil(token)) {
      window.location.href = '/login'
    }
  }


  handleInputChange = (e) => {
    const { target } = e
    const { name, value } = target
    this.setState({ [name]: value })
  }


  openNotificationUpdate = (type) => {
    notification.config({
      placement: 'topRight',
      top: 55,
      duration: 3,
    })
    notification[type]({
      message: 'Update Success!',
      description: 'Update profile successfully.',
    })
  }


  handleSubmitForm = (values) => {
    const { updateUserProfile, userRole } = this.props
    const data = {
      email: values.get('email'),
      firstname: values.get('firstname'),
      lastname: values.get('lastname'),
      mobile: values.get('mobile'),
      id: values.get('id'),
      role: userRole,
    }

    updateUserProfile({ data })

    this.openNotificationUpdate('success')
  }


  render() {
    const {
      isFetching,
    } = this.state

    const {
    //   valid,
    //   pristine,
    //   submitting,
      handleSubmit,
      userRole,
      profile,
    } = this.props

    return (
      <Form onSubmit={handleSubmit(this.handleSubmitForm)}>
        {/* <Form> */}
        <Wrapper>
          {
            userRole === 'PROFESSOR' ? (
              <HeaderProfessor />
            ) : (
              <HeaderAdmin />
            )
          }
          <FormItem>
            {
              (userRole === '' || isFetching) && (
                <LoadingPulse />
              )
            }

            {
              userRole !== '' && !isFetching && (
              <Fields
                names={[
                ]}
                profile={profile}
                component={UpdateProfileForm}
                handleInputChange={this.handleInputChange}
              />
              )

            }
          </FormItem>
        </Wrapper>
      </Form>
    )
  }
}

ProfilePage.propTypes = {
  profile: PropTypes.instanceOf(Map),
  updateUserProfile: PropTypes.func.isRequired,
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
}

ProfilePage.defaultProps = {
  profile: fromJS({}),
  valid: true,
  pristine: true,
  submitting: false,
  handleSubmit: () => {
  },
}

const withForm = reduxForm({
  form: FORM_NAME,
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})

const mapStateToProps = (state, props) => createStructuredSelector({
  initialValues: userSelector.getProfile,
  userRole: userSelector.getUserRole,
  profile: userSelector.getProfile,
  // userStateHttp: userSelector.getUserStateHttp,
  // loadings: employeeSelector.getLoadings,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUserProfile: userAction.updateUserProfile,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
  withForm,
)(ProfilePage)

const FormContainer = styled.div`
  max-width: 100%;
  position: relative;
`

const FormItem = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
`

// language=SCSS prefix=&{ suffix=}
const Wrapper = styled.div`
    display: block;
    position: relative;
    min-height: 80vh;
`

// language=SCSS prefix=&{ suffix=}
const NavBar = styled.nav`
  background-color: ${props => (props.color ? '#fff' : '#F37021')};
  flex: 1;
  min-height: 62px;
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 1;
`

// language=SCSS prefix=&{ suffix=}
const FloatLeft = styled.section`
    flex: 1;
    margin: auto 30px;
`
// language=SCSS prefix=&{ suffix=}
const FloatRight = styled.section`
    flex: 1;
    text-align: right;
    margin: auto;
`

// language=SCSS prefix=&{ suffix=}
const PageTitle = styled.label`
    flex: 1;
    font-size: 18px;
`

// language=SCSS prefix=&{ suffix=}
const Button = styled.button`
  cursor: pointer;
  border: none;
  box-shadow: none;
  margin-right: 25px;
  text-transform: uppercase;
  padding: 10px 40px;
  background-color: ${props => (props.disabled ? '#DADDE1' : '#F37021')};
  border-radius: 4px;
  color: #fff;
`
const Box = styled.div`
  width: 62px;
  height: 62px;
`
