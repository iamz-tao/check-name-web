import React from 'react'
import styled from 'styled-components'
import { Field, FormSection } from 'redux-form/immutable'

import get from 'lodash/get'
import CardForm from '~/components/CardForm'
import {
  SemanticInput,
  DropdownWithLabel,
} from '~/components/ReduxForm'
import DefaultForm from '~/components/DefaultForm'
import FormButton from '~/components/Form/Button'

const AdminCreateSubject = (props) => {
  const handleInput = get(props, 'handleInput')
  const pristine = get(props, 'pristine')
//   const options = get(props, 'options')
  // const semesters = [
  //   {
  //     key: 1,
  //     text: 'First',
  //     value: '1',
  //   },
  //   {
  //     key: 2,
  //     text: 'Second',
  //     value: '2',
  //   },
  //   {
  //     key: 3,
  //     text: 'Summer',
  //     value: '3',
  //   },
  // ]

  return (
    <Wrapper name='createSubject'>
      <CardForm title='CREATE SUBJECT' height='fit-content'>
        <CustomFormSection name=''>
          <DefaultForm
            isRequired
            label='SUBJECT CODE'
            align='end'
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
            align='end'
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
            txtButton='SAVE'
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

export default AdminCreateSubject

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