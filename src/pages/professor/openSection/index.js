import React from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { Button, Form as SemanticForm } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
import { createStructuredSelector } from 'reselect'
import { notification } from 'antd'
import Router from 'next/router'
import moment from 'moment'

import validate from './validate'

import {
  AddSectionForm,
} from './components/addSection'
import withLayout from '~/hocs/Layouts/withLayout'
import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'

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
      getCurrentYear,
    } = this.props
    getSubjects({})
    getCurrentYear({})
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
      message: 'Open section Succeeded!',
      description: 'Open section successfully.',
    })
  }

  submitForm = (values) => {
    // const {
    //   subject_code,
    //   subject_name,
    //   approved_status,
    // } = values.toJS().subject

    // const {
    //   section_number,
    //   late_time,
    //   absent_time,
    //   total_mark,
    // } = values.toJS()

    // const {
    //   day1,
    //   startTime1,
    //   endTime1,
    //   day2,
    //   startTime2,
    //   endTime2,
    // } = this.state

    // const { openSection, currentYear } = this.props
    // const Time = []
    // if (day2 === '') {
    //   Time.push({
    //     day: day1,
    //     start_time: startTime1,
    //     end_time: endTime1,
    //   })
    // } else {
    //   Time.push({
    //     day: day1,
    //     start_time: startTime1,
    //     end_time: endTime1,
    //   },
    //   {
    //     day: day2,
    //     start_time: startTime2,
    //     end_time: endTime2,
    //   })
    // }

    // const data = {
    //   year: Math.trunc(currentYear.get('year')),
    //   semester: currentYear.get('semester'),
    //   Subject: {
    //     subject_code,
    //     subject_name,
    //     approved_status,
    //   },
    //   section_number,
    //   Time,
    //   time_late: late_time,
    //   time_absent: absent_time,
    //   total_mark,
    // }
    // openSection({ data })
    this.openNotificationWithIcon('success')
  }

  handleButtonClick = (e, { value }) => {
    this.setState({
      day1: value,
    })
  }

  getTimeFrom = (from) => {
    const newForm = new Date(from)
    this.setState({
      startTime1: moment(newForm).format("h:mm A"),
    })
  }

  getTimeTo = (to) => {
    const newTo = new Date(to)
    this.setState({
      endTime1: moment(newTo).format("h:mm A"),
    })
  }

  handleButtonClick2 = (e, { value }) => {
    this.setState({
      day2: value,
    })
  }

  getTimeFrom2 = (from) => {
    const newForm = new Date(from)
    this.setState({
      startTime2: moment(newForm).format("h:mm A"),
    })
  }

  getTimeTo2 = (to) => {
    const newTo = new Date(to)
    this.setState({
      endTime2: moment(newTo).format("h:mm A"),
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
      pristine,
      currentYear,
    } = this.props

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
                      handleSubmit={handleSubmit}
                      currentYear={currentYear}
                      pristine={pristine}
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
  currentYear: yearSelector.getCurrentYear,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubjects: subjectAction.getSubjects,
  openSection: subjectAction.openSection,
  getCurrentYear: yearAction.getCurrentYear,
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
