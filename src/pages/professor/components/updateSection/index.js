import React from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import {
  Modal,
  Dropdown,
  Form as SemanticForm,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  reduxForm, Field, FormSection, FieldArray,
} from 'redux-form/immutable'
import { createStructuredSelector } from 'reselect'
import {
  notification,
  TimePicker,
  Button as ButtonAntd,
  Button,
} from 'antd'
import moment from 'moment'
import { fromJS } from 'immutable'
import CustomDropdown from '../CustomDropdown'

import {
  SemanticInput,
} from '~/components/ReduxForm'

import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'

import { day } from '~/config/constants'
import DefaultForm from '~/components/DefaultForm'

const format = 'h:mm A'

const UpdateSection = class extends React.Component {
  state = {
    day_1: '',
    startTime1: '',
    endTime1: '',
    day_2: '',
    startTime2: '',
    endTime2: '',
    keyword: '',
    id: '',
    open: false,
    addDay: false,
  }

  componentDidMount() {
    // const {
    //   getSection,
    // } = this.props
    // getSection({})
  }

  componentWillUnmount() {

  }

  handleInput = (type, e) => {
    this.setState({
      [type]: e,
    })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  openNotificationWithIcon = (type) => {
    notification.config({
      placement: 'topRight',
      top: 60,
      duration: 3,
    })
    notification[type]({
      message: 'Update section Success!',
      description: 'Open section successfully.',
    })
  }

  submitForm = (values) => {
    const { updateSection } = this.props
    const {
      time_late,
      time_absent,
      total_mark,
      start_time1,
      start_time2,
      finish_time1,
      finish_time2,
      day1,
      day2,
      section_id,
    } = values.toJS()

    const {
      day_1,
      startTime1,
      endTime1,
      day_2,
      startTime2,
      endTime2,
    } = this.state

    const stime1 = start_time1 === startTime1 || startTime1 === '' ? start_time1 : startTime1
    const stime2 = start_time2 === startTime2 || startTime2 === '' ? start_time2 : startTime2
    const etime1 = finish_time1 === endTime1 || endTime1 === '' ? finish_time1 : endTime1
    const etime2 = finish_time2 === endTime2 || endTime2 === '' ? finish_time2 : endTime2
    const daySelect1 = day1 === day_1 || day_1 === '' ? day1 : day_1
    const daySelect2 = day2 === day_2 || day_2 === '' ? day2 : day_2

    const Time = []
    if (!day2) {
      Time.push({
        day: daySelect1,
        start_time: stime1,
        end_Time: etime1,
      })
    } else {
      Time.push({
        day: daySelect1,
        start_time: stime1,
        end_Time: etime1,
      },
      {
        day: daySelect2,
        start_time: stime2,
        end_Time: etime2,
      })
    }

    const data = {
      Time,
      time_late,
      time_absent,
      total_mark,
      section_id,
    }
   
    updateSection({ data })
    this.openNotificationWithIcon('success')
  }

  getTimeFrom = (from) => {
    const newForm = new Date(from)
    this.setState({
      startTime1: moment(newForm).format('h:mm A'),
    })
  }

  getTimeTo = (to) => {
    const newTo = new Date(to)
    this.setState({
      endTime1: moment(newTo).format('h:mm A'),
    })
  }

  getTimeFrom2 = (from) => {
    const newForm = new Date(from)
    this.setState({
      startTime2: moment(newForm).format('h:mm A'),
    })
  }

  getTimeTo2 = (to) => {
    const newTo = new Date(to)
    this.setState({
      endTime2: moment(newTo).format('h:mm A'),
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
      handleModal,
      open,
      section,
      initialValues,
    } = this.props

    const {
      addDay,
    } = this.state

    const start_time1 = initialValues && initialValues.getIn(['start_time1'])
    const end_time1 = initialValues && initialValues.getIn(['finish_time1'])
    const start_time2 = initialValues && initialValues.getIn(['start_time2'])
    const end_time2 = initialValues && initialValues.getIn(['finish_time2'])

    return (
      <StyledWrapper
        closeOnDimmerClick={false}
        closeIcon
        open={open}
        onClose={() => handleModal()}
      >
        <Modal.Content>
          <Header>
            UPDATE SECTION
          </Header>
          <LabelWrapper>
            SUBJECT NAME :
            {' '}
            {section && section.getIn(['Subject', 'subject_name'])}
          </LabelWrapper>
          <LabelWrapper>
            SECTION NUMBER :
            {' '}
            {section && section.get('section_number')}
          </LabelWrapper>
          <Wrapper>
            <Form onSubmit={handleSubmit(this.submitForm)}>
              <DefaultForm
                label='DAY :'
                width='176px'
                marginBottom='6px'
              >
                <Field
                  name='day_1'
                  placeholder={section && section.getIn(['day1'])}
                  component={CustomDropdown}
                  options={day}
                  handleInput={this.handleInput}
                />
              </DefaultForm>
              {
             section && section.getIn(['day1']) && (
              <BlankWrapper>
                <DefaultForm
                  isFeature
                  label=''
                  width='176px'
                  marginBottom='10px'
                >
                  <ShowTimeWrapper>
                    <TimePicker
                      format={format}
                      placeholder='Start Time'
                      onChange={this.getTimeFrom}
                      defaultValue={moment(start_time1, 'h:mm A')}
                    />
        &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                    <TimePicker
                      format={format}
                      placeholder='End Time'
                      onChange={this.getTimeTo}
                      defaultValue={moment(end_time1, 'h:mm A')}
                    />
                  </ShowTimeWrapper>
                </DefaultForm>
              </BlankWrapper>
             )
  }
              {
             section && section.getIn(['day2']) && (
              <div>
                <DefaultForm
                  label='DAY 2 :'
                  width='176px'
                  marginBottom='6px'
                >
                  <Field
                    name='day_2'
                    placeholder={section && section.getIn(['day2'])}
                    component={CustomDropdown}
                    options={day}
                    handleInput={this.handleInput}
                  />
                </DefaultForm>
                <BlankWrapper>

                  <DefaultForm
                    isFeature
                    label=''
                    width='176px'
                    marginBottom='20px'
                  >
                    <ShowTimeWrapper>
                      <TimePicker
                        use12Hours
                        format={format}
                        placeholder='Start Time'
                        onChange={this.getTimeFrom2}
                        defaultValue={moment(start_time2, 'h:mm A')}
                      />
        &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                      <TimePicker
                        format={format}
                        placeholder='End Time'
                        onChange={this.getTimeTo2}
                        defaultValue={moment(end_time2, 'h:mm A')}
                      />
                    </ShowTimeWrapper>
                  </DefaultForm>
                </BlankWrapper>
              </div>
              )
            }
              {
              section && !section.getIn(['day2']) && !addDay && (
                <PlusWrapper>
                  <LabelWrapper style={{ paddingRight: '8px' }}>
                    ADD DAY
                  </LabelWrapper>
                  <ButtonPlus onClick={this.handleAddDay}>
                    +
                  </ButtonPlus>
                </PlusWrapper>
              )
            }

              <DefaultForm
                label='LATE TIME (Minute) :'
                width='176px'
                marginBottom='6px'
              >
                <Field
                  required
                  name='time_late'
                  placeholder='Late Time'
                  component={SemanticInput}
                />
              </DefaultForm>
              <DefaultForm
                label='ABSENT TIME (Minute) :'
                width='176px'
                marginBottom='6px'
              >
                <Field
                  name='time_absent'
                  placeholder='Absent Time'
                  component={SemanticInput}
                />
              </DefaultForm>
              <DefaultForm
                label='TOTAL MARK :'
                width='176px'
              >
                <Field
                  required
                  name='total_mark'
                  placeholder='Total Mark'
                  component={SemanticInput}
                />
              </DefaultForm>
              {/* <ButtonWrapper>
                <ButtonCancel onClick={this.handleCancel}>CANCEL</ButtonCancel>
              &nbsp;&nbsp;&nbsp;
                <ButtonSave onClick={this.handleModal}>SAVE</ButtonSave>
              </ButtonWrapper> */}
              <button>xxx</button>
            </Form>
          </Wrapper>
        </Modal.Content>
      </StyledWrapper>
    )
  }
}

const FORM_NAME = 'UPDATE_SECTION'

UpdateSection.defaultProps = {
  section: fromJS({}),
  handleSubmit: () => {
  },
}

const mapStateToProps = (state, props) => createStructuredSelector({
  section: subjectsSelector.getSection,
  initialValues: subjectsSelector.getSection,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSection: subjectAction.getSection,
  openSection: subjectAction.openSection,
  updateSection: subjectAction.updateSection,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  //   validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withForm,
)(UpdateSection)

const Header = styled.span`
  font-size: 18px;
  font-family: Kanit;
  font-weight: bold;
  color: black;
  display: flex;
  padding-left: 18px;
`
const ButtonSave = styled(ButtonAntd)`
  background: #CA5353 !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 28px !important;
  width: 100px !important;
  height: 38px !important;
  color: #fff !important;

`
const ButtonCancel = styled(ButtonAntd)`
  background: #FFFFFF !important;
  border: 1px solid #949494 !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 28px !important;
  width: 100px;
  height: 38px !important;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const StyledWrapper = styled(Modal)`
  max-width: 600px !important;
  min-width: 300px;
  text-align: center !important;
  padding-right: 18px;
  height: fit-content;
  background: #FFFFFF;
  border: 1px solid #C4C4C4 !important;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  font-family: kanit;
  font-size: 14px !important;
  .ant-time-picker-input {
    height: 38px;
    background-color: #EBEBEB !important;
    border: 1px solid rgba(148,148,148,0.5) !important;
    box-sizing: border-box;
    border-radius: 28px !important;
    line-height: 1.8em  ;
  }
  .ant-time-picker {
    width: 100%;
  }
  .ant-btn:focus, .ant-btn:hover {
    color: #CA5353;
    border-color: #CA5353;
}
.ui.selection.dropdown .menu {
  border-radius: 0px 0px 28px 28px;
}
.ui.button {
  display: flex;
  font-family: kanit;
  font-size: 14px;
  font-weight: unset;
  background-color: #EBEBEB !important;
  color: rgba(0,0,0,0.25);
  border-radius: 28px;
  border: 1px solid #ccc2c2;
  width: 100%;
}
`
const Wrapper = styled.div`
  display: flex;
  align-self: center;
  text-align: center !important;
  flex-direction: column;
`
const LabelWrapper = styled.label`
  display: flex;
  padding-left: 18px;
  line-height: 26px;
  font-family: kanit !important;
  font-size: 14px !important;
  font-weight: 400;
  color: black !important;
`
const BlankWrapper = styled.div`

`
const ShowTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

`
const PlusWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`
const ButtonPlus = styled(Button)`
  background: #FFFFFF !important;
  border: 1px solid rgba(36, 52, 69, 0.5) !important;
  box-sizing: border-box !important;
  border-radius: 12px !important;
  width: 32px !important;
  height: 32px;
  padding: 0px 0px 4px 0px !important;
  border: 1px solid rgba(36, 52, 69, 0.5) !important;
  font-size: 28px !important;
  line-height: 0;
`
const CustomFormSection = styled(FormSection)`
  margin: 10px 0px 0px 0px;
  font-size: 16px !important;
`
const Form = styled(SemanticForm)`
  width: 100%;
`
