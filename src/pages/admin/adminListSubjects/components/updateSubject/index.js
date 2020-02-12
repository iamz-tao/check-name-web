import React from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import {
  Modal,
  Dropdown,
  Form as SemanticForm,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { reduxForm, Field, FormSection } from 'redux-form/immutable'
import { createStructuredSelector } from 'reselect'
import {
  notification,
  TimePicker,
  Button as ButtonAntd,
  Button,
} from 'antd'
import Router from 'next/router'
import moment from 'moment'

import {
  SemanticInput,
  DropdownWithLabel,
} from '~/components/ReduxForm'

import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'


import { day } from '~/config/constants'
import DefaultForm from '~/components/DefaultForm'

const format = 'h:mm A'

const UpdateSubject = class extends React.Component {
  state = {
    open: false,
    name: '',
    code: '',
  }

  componentDidMount() {
    const {
      getSubject,
      id,
    } = this.props
    getSubject({
      id,
    })
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
    console.log('values', values)
    // const {
    //   subject_code,
    //   subject_name,
    //   approved_status,
    //   year,
    //   semester,
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

    // const { UpdateSection } = this.props
    // const Time = []
    // if (day2 === '') {
    //   Time.push({
    //     day: day1,
    //     start_time: startTime1,
    //     end_Time: endTime1,
    //   })
    // } else {
    //   Time.push({
    //     day: day1,
    //     start_time: startTime1,
    //     end_Time: endTime1,
    //   },
    //   {
    //     day: day2,
    //     start_time: startTime2,
    //     end_Time: endTime2,
    //   })
    // }

    // const data = {
    //   year,
    //   semester,
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

    // UpdateSection({ data })
    this.openNotificationWithIcon('success')
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


  render() {
    const {
      handleSubmit,
      subject,
      open,
      handleModal,
      id,
    } = this.props

    const {
      name,
      code,
      addDay,
    } = this.state
console.log('idd',id)
    return (
      <StyledWrapper
        closeOnDimmerClick={false}
        closeIcon
        open={open}
        onClose={() => handleModal()}
      >
        <Modal.Content>
          <Header>
            UPDATE SUBJECT
          </Header>
          <Wrapper>
            <Form onSubmit={handleSubmit(this.submitForm)}>
              <CustomFormSection>
                <DefaultForm
                  label='SUBJECT CODE :'
                  width='176px'
                  marginBottom='6px'
                >
                  <Field
                    required
                    name='subject_code'
                    placeholder='Subject Code'
                    component={SemanticInput}
                  />
                </DefaultForm>
                <DefaultForm
                  label='SUBJECT NAME :'
                  width='176px'
                  marginBottom='6px'
                >
                  <Field
                    name='subject_name'
                    placeholder='Subject Name'
                    component={SemanticInput}
                  />
                </DefaultForm>
              </CustomFormSection>
              <ButtonWrapper>
                <ButtonCancel onClick={this.handleCancel}>CANCEL</ButtonCancel>
              &nbsp;&nbsp;&nbsp;
                <ButtonSave onClick={this.handleModal}>SAVE</ButtonSave>
              </ButtonWrapper>
            </Form>
          </Wrapper>
        </Modal.Content>
      </StyledWrapper>
    )
  }
}

const FORM_NAME = 'UPDATE_SECTION'


const mapStateToProps = (state, props) => createStructuredSelector({
  // currentYear: yearSelector.getCurrentYear,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubject: subjectAction.getSubject,
  updateSubject: subjectAction.updateSubject,
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
)(UpdateSubject)

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
