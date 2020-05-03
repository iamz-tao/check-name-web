import React from 'react'
import styled from 'styled-components'
import { Field, FormSection } from 'redux-form/immutable'

import get from 'lodash/get'
import CardForm from '~/components/CardForm'
import {
  SemanticInput,
} from '~/components/ReduxForm'
import DefaultForm from '~/components/DefaultForm'
import FormButton from '~/components/Form/Button'
import LoadingPulse from '~/components/LoadingPulse'

const CreateSubject = (props) => {
  const currentYear = get(props, 'currentYear')
  const pristine = get(props, 'pristine')
  
  if (!currentYear) {
    return (
      <LoadingPulse />
    )
  }

  const year = currentYear.get('year')
  const semester = currentYear.get('semester') === 'FIRST' ? 1 : currentYear.get('semester') === 'SECOND' ? 2 : 'SUMMER'

  return (
    <Wrapper name='createSubject'>
      <CardForm title='NEW SUBJECT' height='388px'>
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
          >
            <Field
              required
              name='subject_code'
              placeholder='Subject Code'
              component={SemanticInput}
            />
          </DefaultForm>

          <DefaultForm
            isRequired
            label='SUBJECT NAME'
          >
            <Field
              required
              name='subject_name'
              placeholder='Subject Name'
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
            // Router.push('/adminRegister')
            }}
          />
          <EmptySpace />
          <FormButton
            disabled={pristine}
            colorButton='#CA5353'
            type='submit'
            txtButton='REQUEST'
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

export default CreateSubject

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
