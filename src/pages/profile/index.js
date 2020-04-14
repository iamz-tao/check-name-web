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
      submitting,
      handleSubmit,
      userRole,
      profile,
    } = this.props
    return (
      <Form onSubmit={handleSubmit(this.handleSubmitForm)}>
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
                submitting={submitting}
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
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUserProfile: userAction.updateUserProfile,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
  withForm,
)(ProfilePage)

const FormItem = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
`

const Wrapper = styled.div`
    display: block;
    position: relative;
    min-height: 80vh;
`

