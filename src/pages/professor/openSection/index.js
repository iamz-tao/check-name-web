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
  AddSectionForm,
} from './components/addSection'
import withLayout from '~/hocs/Layouts/withLayout'
import LoadingPulse from '~/components/LoadingPulse'
import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'

const OpenSection = class extends React.Component {
  state = {
    day1: '',
    startTime1: '',
    endTime1: '',
    day2: '',
    startTime2: '',
    endTime2: '',
    keyword: '',
    id: '',
    open: false,
    addDay: false,
  }

  componentDidMount() {
    const {
      getSubjects,
    } = this.props
    getSubjects({})
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

  pathCreateSubject = () => {
    Router.replace('/professor-create-subject')
  }

  openNotificationWithIcon = (type) => {
    notification.config({
      placement: 'topRight',
      top: 60,
      duration: 3,
    })
    notification[type]({
      message: 'Open section Success!',
      description: 'Open section successfully.',
    })
  }

  submitForm = (values) => {
    const {
      subject_code,
      subject_name,
      approved_status,
      year,
      semester,
    } = values.toJS().subject

    const {
      section_number,
      late_time,
      absent_time,
      total_mark,
    } = values.toJS()

    const {
      day1,
      startTime1,
      endTime1,
      day2,
      startTime2,
      endTime2,
    } = this.state

    const { openSection } = this.props
    const Time = []
    if (day2 === '') {
      Time.push([{
        day: day1,
        start_time: startTime1,
        end_Time: endTime1,
      }])
    } else {
      Time.push({
        day: day1,
        start_time: startTime1,
        end_Time: endTime1,
      },
      {
        day: day2,
        start_time: startTime2,
        end_Time: endTime2,
      })
    }

    const data = {
      year,
      semester,
      Subject: {
        subject_code,
        subject_name,
        approved_status,
      },
      section_number,
      Time,
      time_late: late_time,
      time_absent: absent_time,
      total_mark,
    }

    openSection({ data })
    this.openNotificationWithIcon('success')
  }

  handleButtonClick = (e) => {
    const {
      value,
    } = e.item.props
    this.setState({
      day1: value,
    })
  }

  getTimeFrom = (from) => {
    this.setState({
      startTime1: from._i,
    })
  }

  getTimeTo = (to) => {
    this.setState({
      endTime1: to._i,
    })
  }

  handleButtonClick2 = (e) => {
    const {
      value,
    } = e.item.props
    this.setState({
      day2: value,
    })
  }

  getTimeFrom2 = (from) => {
    this.setState({
      startTime2: from._i,
    })
  }

  getTimeTo2 = (to) => {
    this.setState({
      endTime2: to._i,
    })
  }

  handleModal = () => {
    const { open } = this.state
    this.setState({
      open: !open,
      addDay: false,
    })
  }

  handleCancel = () => {
    const { open } = this.state
    this.setState({
      open: !open,
      daySelect: '',
      startTime: '',
      endTime: '',
      addDay: false,
    })
  }

  handleAddDay = () => {
    const { addDay } = this.state
    this.setState({
      addDay: !addDay,
    })
  }

  render() {
    const {
      handleSubmit,
      subjects,
      invalid,
    } = this.props
// console.log('inaaa',invalid)
    const {
      day1,
      startTime1,
      endTime1,
      day2,
      startTime2,
      endTime2,
      open,
      addDay,
    } = this.state

    const options = []
    const subjectActive = subjects ? subjects.toJS().filter(s => s.approved_status === 'APPROVE') : []
    if (subjectActive.length !== 0) {
      subjectActive.map((s, i) => {
        options.push({
          key: i,
          text: `${s.subject_code} ${s.subject_name}`,
          value: s,
        })
      })
    }

    const settingSec = {
      day1,
      startTime1,
      endTime1,
      day2,
      startTime2,
      endTime2,
    }

    return (
      <PageWrapper>
        <HeaderProfessor />
        <Form onSubmit={handleSubmit(this.submitForm)}>
          <Row>
            <Col width='916px'>
              <AdsTypeWrapper>
                <Form>
                  <div id='addSection'>
                    <AddSectionForm
                      subjects={options}
                      pathCreateSubject={this.pathCreateSubject}
                      handleInput={this.handleInput}
                      getTimeFrom={this.getTimeFrom}
                      getTimeTo={this.getTimeTo}
                      handleButtonClick={this.handleButtonClick}
                      getTimeFrom2={this.getTimeFrom2}
                      getTimeTo2={this.getTimeTo2}
                      handleButtonClick2={this.handleButtonClick2}
                      open={open}
                      handleModal={this.handleModal}
                      handleCancel={this.handleCancel}
                      handleInputChange={this.handleInputChange}
                      handleAddDay={this.handleAddDay}
                      addDay={addDay}
                      settingSec={settingSec}
                      // invalid={invalid}
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

const FORM_NAME = 'OPEN_SECTION'


const mapStateToProps = (state, props) => createStructuredSelector({
  subjects: subjectsSelector.getSubjects,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubjects: subjectAction.getSubjects,
  openSection: subjectAction.openSection,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})

export default compose(
  withLayout,
  connect(mapStateToProps, mapDispatchToProps),
  withForm,
)(OpenSection)

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
