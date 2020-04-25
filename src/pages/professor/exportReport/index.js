import React from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { Button, Form as SemanticForm } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Field, reduxForm, FormSection } from 'redux-form/immutable'
import { createStructuredSelector } from 'reselect'

// import validate from './validate'
import {
  DropdownWithLabel,
} from '~/components/ReduxForm'
import FormButton from '~/components/Form/Button'
import DefaultForm from '~/components/DefaultForm'
import CardForm from '~/components/CardForm'

import withLayout from '~/hocs/Layouts/withLayout'
import LoadingPulse from '~/components/LoadingPulse'
import HeaderProfessor from '~/components/HeaderNavbar/Professor'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'
import { yearAction } from '~/modules/admin/actions'
import { yearSelector } from '~/modules/admin/selectors'


const ExportReport = class extends React.Component {
  state = {
    id: '',
    section: '',
    subject: '',
  }

  componentDidMount() {
    const { getCurrentYear, getSections } = this.props
    getCurrentYear({})
    getSections({})
  }

  componentWillUnmount() {
  }

  handleInput = (type, e) => {
    const { change } = this.props
    change(type, e)
    this.setState({
      id: e,
    })
  }

  handleInputSection = (type, e) => {
    const { change } = this.props
    change(type, e)
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  submitForm = (values) => {
    const {
      subject,
      section,
    } = values.toJS()

    const {
      currentYear,
      exportReport,
      subjects,
    } = this.props

    const year = currentYear.get('year')
    const semester = currentYear.get('semester')
    const subject_name = subjects.filter(s => s.getIn(['Subject', 'subject_code']) === subject).getIn([0,'Subject','subject_name'])
    const data = {
      year,
      semester,
      subject_code: subject,
      subject_name,
      section,
    }
    // console.log(subject_name)
    exportReport({ data })
  }

  render() {
    const {
      handleSubmit,
      currentYear,
      subjects,
      // invalid,
      // initialValues,
    } = this.props

    const {
      id,
    } = this.state

    if (!currentYear || !subjects) {
      return (
        <LoadingPulse />
      )
    }

    const year = currentYear.get('year')
    const semester = currentYear.get('semester') === 'FIRST' ? 1 : currentYear.get('semester') === 'SECOND' ? 2 : 'SUMMER'

    const subject = []
    const sections = []
    subjects.map((sub) => {
      subject.push({
        value: sub.getIn(['Subject', 'subject_code']),
        text: `${sub.getIn(['Subject', 'subject_code'])} ${sub.getIn(['Subject', 'subject_name'])}`,
      })
    })

    if (id !== '') {
      subjects.filter(s => s.getIn(['Subject', 'subject_code']) === id).getIn([0, 'sections']).map((sec) => {
        sections.push({
          value: sec.getIn(['section_number']),
          text: sec.getIn(['section_number']),
        })
      })
    }


    return (
      <PageWrapper>
        <HeaderProfessor />
        <Form onSubmit={handleSubmit(this.submitForm)}>
          <Row>
            <Col width='916px'>
              <AdsTypeWrapper>
                <Form>
                  <div id='exportReport'>
                    <Wrapper name='exportReport'>
                      <CardForm title='EXPORT REPORT' height='388px'>
                        <CustomFormSection name=''>
                          <LabelWrapper>
                            YEAR / SEMESTER :
                            {' '}
                            {year}
                            /
                            {semester}
                          </LabelWrapper>
                          <DefaultForm
                            isRequired
                            label='SELECT SUBJECT'
                            width='122px'
                          >
                            <Field
                              required
                              name='subject'
                              placeholder='Subject'
                              component={DropdownWithLabel}
                              options={subject}
                              handleInput={this.handleInput}
                            />
                          </DefaultForm>

                          <DefaultForm
                            isRequired
                            label='SECTION NUMBER'
                            width='122px'
                          >
                            <Field
                              required
                              name='section'
                              placeholder='Section'
                              component={DropdownWithLabel}
                              options={sections}
                              handleInput={this.handleInputSection}
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
                            // Router.push('/adminRegister')
                            }}
                          />
                          <EmptySpace />
                          <FormButton
                            colorButton='#CA5353'
                            type='submit'
                            txtButton='EXPORT'
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

const FORM_NAME = 'EXPORT_REPORT'


const mapStateToProps = (state, props) => createStructuredSelector({
  subjects: subjectsSelector.getSubjectsExport,
  currentYear: yearSelector.getCurrentYear,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSections: subjectAction.getSubjectsExport,
  getCurrentYear: yearAction.getCurrentYear,
  exportReport: subjectAction.exportReport,
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
)(ExportReport)

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
const LabelWrapper = styled.label`
  line-height: 41px;
  font-family: kanit !important;
  font-size: 14px !important;
  font-weight: 400;
  color: rgb(89.25,89.25,89.25) !important;
`
