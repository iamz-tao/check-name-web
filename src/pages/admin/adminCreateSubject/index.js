import React from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { Button, Form as SemanticForm } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { notification } from 'antd'
import Router from 'next/router'

import validate from './validate'

import {
  AdminCreateSubject,
} from './components/CreateSubject'
import withLayout from '~/hocs/Layouts/withLayout'
import LoadingPulse from '~/components/LoadingPulse'
import HeaderAdmin from '~/components/HeaderNavbar/Admin'
import { subjectAction } from '~/modules/subject/actions'

const AdminCreateUpdateSubject = class extends React.Component {
  state = {
    adsTypes: null,
    allFeatures: null,
    keyword: '',
    id: '',
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
  }

  handleInput = (type, e) => {
    const { change } = this.props
    change(type, e)
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  openNotificationCreateSuccess = (type) => {
    notification.config({
      placement: 'topRight',
      top: 60,
      duration: 3,
    })
    notification[type]({
      message: 'Create Succeeded!',
      description: 'Create subject successfully.',
    })
  }

  submitForm = (values) => {
    const {
      // year,
      // semester,
      subject_code,
      subject_name,
    } = values.toJS()

    const {
      createSubject,
    } = this.props

    const data = {
      // year,
      // semester,
      subject_code,
      subject_name,
      approved_status: 'PENDING',
    }

    createSubject({ data })
    this.openNotificationCreateSuccess('success')
  }

  render() {
    const {
      handleSubmit,
      // invalid,
    } = this.props

    // if (!allFeatures && !initialValues) {
    //   return <LoadingPulse />
    // }

    return (
      <PageWrapper>
        <HeaderAdmin/>
        <Form onSubmit={handleSubmit(this.submitForm)}>
        <Row>
          <Col width='916px'>
            <AdsTypeWrapper>
              <Form>
                <div id='createSubject'>
                  <AdminCreateSubject
                    handleInput={this.handleInput}
                  />
                </div>
              </Form>
            </AdsTypeWrapper>
          </Col>
        </Row>
        </Form>
      </PageWrapper>
    )
  }
}

const FORM_NAME = 'CRAETE_UPDATE_SUBJECT'


const mapStateToProps = (state, props) => createStructuredSelector({
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  createSubject: subjectAction.createSubject,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  // validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})

export default compose(
  withLayout,
  connect(mapStateToProps, mapDispatchToProps),
  withForm,
)(AdminCreateUpdateSubject)

const PageWrapper = styled.div`
  font-family: Sarabun;
`
const Row = styled.div`
  display: flex;
  justify-content: center;
`

const CustomButton = styled(Button)`
  height: 33px;
  min-width: 130px;
  max-width: 150px;
  font-size: 16px;

  .ui.basic.red.buttons .button {
    box-shadow: 0 0 0 2px #db2828 inset!important;
    color: #D90000!important;
    }
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  padding: 50px 10px 20px 10px;
`
const AdsTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Form = styled(SemanticForm)`
  width: 100%;
`
