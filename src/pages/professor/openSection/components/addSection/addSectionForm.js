import React from 'react'
import styled from 'styled-components'
import { Field, FormSection } from 'redux-form/immutable'
// import get from 'lodash/get'
import { Button } from 'antd'
import Router from 'next/router'

import CreateSection from './create-section'

import CardForm from '~/components/CardForm'
import {
  SemanticInput,
  DropdownWithLabel,
} from '~/components/ReduxForm'
import LoadingPulse from '~/components/LoadingPulse'
import DefaultForm from '~/components/DefaultForm'
import FormButton from '~/components/Form/Button'

const AddSectionForm = (props) => {
  const {
    handleInput,
    handleModal,
    getTimeFrom,
    getTimeTo,
    handleButtonClick,
    getTimeFrom2,
    getTimeTo2,
    handleButtonClick2,
    open,
    handleCancel,
    pathCreateSubject,
    subjects,
    handleInputChange,
    handleAddDay,
    addDay,
    settingSec,
    handleSubmit,
    currentYear,
    pristine,
  } = props
  const {
    day1,
    startTime1,
    endTime1,
    day2,
    startTime2,
    endTime2,
  } = settingSec

  const height = day1 !== '' ? 'fit-content' : '576px'
  if (currentYear === null) {
    return (
      <LoadingPulse />
    )
  }

  const year = currentYear.get('year')
  const semester = currentYear.get('semester') === 'FIRST' ? 1 : currentYear.get('semester') === 'SECOND' ? 2 : 'SUMMER'

  return (
    <Wrapper name='addSection'>
      <CreateSection
        open={open}
        handleInput={handleInput}
        getTimeFrom={getTimeFrom}
        getTimeTo={getTimeTo}
        handleButtonClick={handleButtonClick}
        getTimeFrom2={getTimeFrom2}
        getTimeTo2={getTimeTo2}
        handleButtonClick2={handleButtonClick2}
        handleModal={handleModal}
        handleCancel={handleCancel}
        handleAddDay={handleAddDay}
        addDay={addDay}
        handleSubmit={handleSubmit}
        year={year}
        semester={semester}
      />
      <CardForm
        title='OPEN SECTION'
        height={height}
        canSearch
        handleModal={pathCreateSubject}
      >
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
            label='SUBJECT CODE'
            width='176px'
          >
            <Field
              required
              name='subject'
              placeholder='Subject Code'
              component={DropdownWithLabel}
              options={subjects}
              handleInput={handleInput}
            />
          </DefaultForm>

        </CustomFormSection>
        <CustomFormSection name=''>
          <DefaultForm
            isRequired
            label='LATE TIME (Minute)'
            width='176px'
          >
            <Field
              required
              name='late_time'
              placeholder='Late Time'
              component={SemanticInput}
            />
          </DefaultForm>

          <DefaultForm
            isRequired
            label='ABSENT ITME (Minute)'
            width='176px'
          >
            <Field
              required
              name='absent_time'
              placeholder='Absent Time'
              component={SemanticInput}
            />
          </DefaultForm>

          <DefaultForm
            isRequired
            label='TOTAL MARK'
            width='176px'
          >
            <Field
              required
              name='total_mark'
              placeholder='Total Mark'
              component={SemanticInput}
            />
          </DefaultForm>
          <div style={{ display: 'flex', justifyContent: 'row' }}>
            <DefaultForm
              isRequired
              label='SECTION NUMBER'
              width='176px'
            >
              <Field
                required
                name='section_number'
                placeholder='Section Number'
                component={SemanticInput}
                onChange={handleInputChange}
              />

            </DefaultForm>
            &nbsp; &nbsp;
            <Button onClick={handleModal} disabled={pristine}>
              SETTING
            </Button>
          </div>
          <div>
            {
            day1 !== '' && (
              <div style={{ display: 'flex' }}>
                <LabelWrapperSection>
                  DETAIL :
                </LabelWrapperSection>
                <LabelWrapper style={{ paddingLeft: '20px' }}>
                  {day1}
                  <br />
                  {startTime1}
                  {' '}
                  -
                  {' '}
                  {endTime1}
                </LabelWrapper>
                {
            day2 !== '' && (
              <div style={{ display: 'flex' }}>
                <LabelWrapper style={{ flex: 3, paddingLeft: '20px' }}>
                  {day2}
                  <br />
                  {startTime2}
                  {' '}
                  -
                  {' '}
                  {endTime2}
                </LabelWrapper>
              </div>
            )
          }
              </div>
            )
          }
          </div>

        </CustomFormSection>
        <CustomButtonGroup>
          <CancelButton
            style={{
              color: '#949494',
              background: '#FFFFFF',
              height: '51px',
              width: '142px',
              margin: '28px 0px',
            }}
            type='cancel'
            onClick={() => {
              Router.push('/professor')
            }}
          >
            CANCEL
          </CancelButton>
          <EmptySpace />
          <FormButton
            disabled={pristine}
            colorButton='#CA5353'
            type='submit'
            txtButton='OPEN'
            width='50%'
            onClick={() => {
            // Router.push('/adminRegister')
            }}
          />
        </CustomButtonGroup>
      </CardForm>
    </Wrapper>
  )
}


export default AddSectionForm

const Wrapper = styled.div`
  width: 100%;
  .ant-btn {
    color: #fff;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    background: #006765;
    mix-blend-mode: normal;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 28px;
    width: 98px;
    height: 38px;
  }
  .ant-btn:focus, .ant-btn:hover {
    background: rgba(0, 0, 0, 0.33) !important;
    color: #fff !important;
  }
  .ui.fluid.dropdown {
    border-radius: 21px;
    background : #EBEBEB !important,
  }
`
const CustomFormSection = styled(FormSection)`
  margin: 10px 0px 0px 0px;
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
const LabelWrapperSection = styled.label`
  display: flex;
  justify-content: flex-end;
  width: 176px;
  line-height: 40px;
  font-family: kanit !important;
  font-size: 14px !important;
  font-weight: 400;
  color: rgb(89.25,89.25,89.25) !important;
`
const CancelButton = styled(Button)`
  border: 1px solid #949494 !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 28px !important;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
