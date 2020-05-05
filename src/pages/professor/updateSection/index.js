import React from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { Button, Form as SemanticForm } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { reduxForm, Field, FormSection } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import {
  notification,
  TimePicker,
} from 'antd'
// import Router from 'next/router'
import get from 'lodash/get'
import moment from 'moment'
import { Router } from '~/routes'


// import validate from './validate'

import withLayout from '~/hocs/Layouts/withLayout'
import LoadingPulse from '~/components/LoadingPulse'
import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import CardForm from '~/components/CardForm'
import {
  SemanticInput,
  DropdownWithLabel,
} from '~/components/ReduxForm'
import DefaultForm from '~/components/DefaultForm'
import FormButton from '~/components/Form/Button'
import { day } from '~/config/constants'

const format = 'h:mm A'

const UpdateSection = class extends React.Component {
  state = {
    day_1: '',
    startTime1: '',
    endTime1: '',
    startTime2: '',
    endTime2: '',
    addDay: false,
    removeDay: false,
  }

  componentDidMount() {
    const { query: { id } } = Router
    const { getSection } = this.props
    getSection({
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

  openNotificationCreateSuccess = (type) => {
    notification.config({
      placement: 'topRight',
      top: 60,
      duration: 3,
    })
    notification[type]({
      message: 'Update Succeeded!',
      description: '๊Update section successfully.',
    })
  }

  submitForm = (values) => {
    const { updateSection, handleModal } = this.props
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
      startTime1,
      endTime1,
      startTime2,
      endTime2,
    } = this.state
    console.log(values.toJS())
    // this.openNotificationCreateSuccess('success')
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

  handleAddDay = () => {
    const { addDay } = this.state
    this.setState({
      addDay: !addDay,
    })
  }

  handleRemoveDay = () => {
    const { removeDay } = this.state
    this.setState({
      removeDay: !removeDay,
    })
  }

  render() {
    const {
      handleSubmit,
      initialValues,
      // pristine
    } = this.props

    const {
      day_1,
      startTime1,
      endTime1,
      startTime2,
      endTime2,
      addDay,
      removeDay,
    } = this.state

    if (!initialValues) {
      return <LoadingPulse />
    }

    const subject = `${initialValues.getIn(['Subject', 'subject_code'])} ${initialValues.getIn(['Subject', 'subject_name'])}`
    const section = initialValues.getIn(['section_number'])

    const start_time1 = initialValues.getIn(['start_time1']) ? initialValues.getIn(['start_time1']) : null
    const end_time1 = initialValues.getIn(['finish_time1']) ? initialValues.getIn(['finish_time1']) : null
    const start_time2 = initialValues.getIn(['start_time2']) ? initialValues.getIn(['start_time2']) : 'Select Time'
    const end_time2 = initialValues.getIn(['finish_time2']) ? initialValues.getIn(['finish_time2']) : 'Select Time'

    return (
      <PageWrapper>
        <HeaderProfessor />
        <Form onSubmit={handleSubmit(this.submitForm)}>
          <Row>
            <Col width='916px'>
              <AdsTypeWrapper>
                <Form>
                  <div id='updateSection'>
                    <Wrapper name='updateSection'>
                      <CardForm title='UPDATE SECTION' height='fit-content'>
                        <CustomFormSection name=''>
                          <Header>
          SUBJECT :
                            {' '}
                            {subject}
                          </Header>
                          <Header>
          SUBJECT :
                            {' '}
                            {section}
                          </Header>
                          <DefaultForm
                            label='DAY'
                          >
                            <Field
                              required
                              name='day1'
                              placeholder='Select Day'
                              options={day}
                              component={DropdownWithLabel}
                              handleInput={this.handleInput}
                              style={{ width: '100%' }}
                            />
                          </DefaultForm>

                          <BlankWrapper>
                            <DefaultForm
                              label='TIME'
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
                          {!initialValues.getIn(['start_time2']) && !initialValues.getIn(['finish_time2']) && !addDay && (
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

                          {
            addDay && (
            <div>
              <DefaultForm
                label='SECOND DAY'
              >
                <Field
                  required
                  name='day2'
                  placeholder='Select Day'
                  options={day}
                  component={DropdownWithLabel}
                  handleInput={this.handleInput}
                  style={{ width: '100%' }}
                />
              </DefaultForm>
              <BlankWrapper>

                <DefaultForm
                  label='SECOND TIME'
                >
                  <ShowTimeWrapper>
                    <TimePicker
                      use12Hours
                      format={format}
                      placeholder='Start Time'
                      onChange={this.getTimeFrom2}
                      defaultValue={initialValues.getIn(['start_time2']) !== undefined && moment(start_time2, 'h:mm A')}
                    />
           &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                    <TimePicker
                      format={format}
                      placeholder='End Time'
                      onChange={this.getTimeTo2}
                      defaultValue={initialValues.getIn(['finish_time2']) !== undefined && moment(end_time2, 'h:mm A')}
                    />
                  </ShowTimeWrapper>
                </DefaultForm>
              </BlankWrapper>
            </div>
            )
  }

                          {
            (initialValues.getIn(['day2']) && initialValues.getIn(['start_time2']) && initialValues.getIn(['finish_time2'])) && (
            <div>
              <DefaultForm
                label='SECOND DAY'
              >
                <Field
                  required
                  name='day2'
                  placeholder='Select Day'
                  options={day}
                  component={DropdownWithLabel}
                  handleInput={this.handleInput}
                  style={{ width: '100%' }}
                />
              </DefaultForm>
              <BlankWrapper>

                <DefaultForm
                  label='SECOND TIME'
                >
                  <ShowTimeWrapper>
                    <TimePicker
                      use12Hours
                      format={format}
                      placeholder='Start Time'
                      onChange={this.getTimeFrom2}
                      defaultValue={initialValues.getIn(['start_time2']) !== undefined && moment(start_time2, 'h:mm A')}
                    />
           &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
                    <TimePicker
                      format={format}
                      placeholder='End Time'
                      onChange={this.getTimeTo2}
                      defaultValue={initialValues.getIn(['finish_time2']) !== undefined && moment(end_time2, 'h:mm A')}
                    />
                  </ShowTimeWrapper>
                </DefaultForm>
              </BlankWrapper>
              <PlusWrapper>
                            <LabelWrapper style={{ paddingRight: '8px' }}>
                    REMOVE DAY
                            </LabelWrapper>
                            <ButtonPlus onClick={this.handleRemoveDay}>
                    -
                            </ButtonPlus>
                          </PlusWrapper>
            </div>
            )
  }

                          <DefaultForm
                            label='LATE TIME'
                            align='end'
                          >
                            <Field
                              name='time_late'
                              placeholder='Late Time'
                              component={SemanticInput}
                            />
                          </DefaultForm>

                          <DefaultForm
                            label='ABSENT TIME'
                            align='end'
                          >
                            <Field
                              name='time_absent'
                              placeholder='Absent Time'
                              component={SemanticInput}
                            />
                          </DefaultForm>

                          <DefaultForm
                            label='TOTAL MARK'
                            align='end'
                          >
                            <Field
                              required
                              name='total_mark'
                              placeholder='Total Mark'
                              component={SemanticInput}
                            />
                          </DefaultForm>

                        </CustomFormSection>
                        <CustomButtonGroup>
                          <FormButton
                            colorButton='#FFFFFF'
                            type='cancel'
                            txtButton='CANCEL'
                            width='50%'
                            onClick={() => {
                              Router.push('/professor')
                            }}
                          />
                          <EmptySpace />
                          <FormButton
            // disabled={pristine}
                            colorButton='#CA5353'
                            type='submit'
                            txtButton='SAVE'
                            width='50%'
                            onClick={() => {
                              // Router.push('/adminRegister')
                            }}
                          />
                        </CustomButtonGroup>
                      </CardForm>
                    </Wrapper>
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

UpdateSection.propTypes = {
  section: PropTypes.instanceOf(Map),
  handleSubmit: PropTypes.func,
}

UpdateSection.defaultProps = {
  section: fromJS({}),
  handleSubmit: () => {
  },
}

const FORM_NAME = 'UPDATE_SECTION'


const mapStateToProps = (state, props) => createStructuredSelector({
  getSection: subjectsSelector.getSection,
  initialValues: subjectsSelector.getSection,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  updateSection: subjectAction.updateSection,
  getSection: subjectAction.getSection,
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
)(UpdateSection)

const PageWrapper = styled.div`
  font-family: Sarabun;
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
const Row = styled.div`
  display: flex;
  justify-content: center;
`

const Header = styled.span`
  font-size: 16px;
  font-family: Kanit;
  color: rgb(89.25,89.25,89.25);
  display: flex;
  padding-left: 18px;
  margin-bottom: 8px;
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


const Wrapper = styled.div`
  width: 100%;
`
const CustomFormSection = styled(FormSection)`
  margin: 10px 0px 20px 0px;
  font-size: 16px !important;
`
const CustomButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`
const EmptySpace = styled.div`
  width: 10px;
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
